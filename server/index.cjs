const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

function getLanguageName(code) {
  const names = {
    en: "English",
    hi: "Hindi",
    ta: "Tamil",
    ml: "Malayalam",
    mr: "Marathi",
    bn: "Bengali",
  };

  return names[code] || "English";
}

function buildPrompt({ ingredients, languageCode, queryText }) {
  const targetLanguage = getLanguageName(languageCode);
  const isQueryMode = queryText && queryText.trim().length > 0;

  return `
Return only valid json.

All user-facing recipe content must be written in ${targetLanguage}.

${isQueryMode
      ? `The user asked this food request:
"${queryText}"

Generate recipes that are only directly related to this request.
If the user asks "How to make Maggie", return only Maggie-related recipes or Maggie variations.`
      : `The user has these ingredients:
${ingredients.join(", ")}

Generate realistic recipes using these ingredients.`
    }

IMPORTANT:
- Write title, description, ingredients, missingIngredients, steps and chefTip in ${targetLanguage}
- Keep these fields in English only for app logic:
  - category must be Breakfast, Dinner, or Desserts
  - level must be Easy, Medium, or Hard
  - foodType must be exactly Veg or Non-Veg
  - tag can be QUICK, VEG, NON-VEG, CHEF'S PICK, or empty

IMPORTANT FOOD RULE:
- Veg means no chicken, egg, fish, seafood, mutton, lamb, bacon or any meat
- Non-Veg means recipe contains egg or meat or fish or seafood

Return exactly 4 relevant recipes.

Return this exact json shape:
{
  "recipes": [
    {
      "id": "recipe-1",
      "title": "string",
      "description": "string",
      "time": 25,
      "level": "Easy",
      "tag": "QUICK",
      "category": "Dinner",
      "dietary": ["Veg"],
      "kitchenFriendly": true,
      "rating": "4.8",
      "reviews": 120,
      "ingredients": ["string"],
      "missingIngredients": ["string"],
      "steps": ["string"],
      "servings": 2,
      "chefTip": "string",
      "nutrition": {
        "calories": 320,
        "protein": 12,
        "fat": 10,
        "carbs": 44
      }
    }
  ]
}

Rules:
- Output only json
- No markdown
- No explanation outside json
- ingredients must contain 4 to 12 items
- steps must contain 6 to 10 detailed items
- each step must be useful
- time must be a number
- nutrition values must be integers
`.trim();
}

async function getRecipeImage(query) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const photo = data?.photos?.[0];

    if (!photo) return null;

    return {
      image: photo.src?.large2x || photo.src?.large || photo.src?.medium || "",
      photographer: photo.photographer || "",
      photographerUrl: photo.photographer_url || "",
      pexelsUrl: photo.url || "",
    };
  } catch (error) {
    return null;
  }
}

function normalizeNutrition(nutrition) {
  return {
    calories: Number(nutrition?.calories) || 320,
    protein: Number(nutrition?.protein) || 24,
    fat: Number(nutrition?.fat) || 14,
    carbs: Number(nutrition?.carbs) || 10,
  };
}

function normalizeRecipe(item, index) {
  const validLevels = ["Easy", "Medium", "Hard"];
  const validCategories = ["Breakfast", "Dinner", "Desserts"];

  return {
    id: item?.id || `recipe-${index + 1}`,
    title: String(item?.title || `Recipe ${index + 1}`).trim(),
    description: String(item?.description || "Tasty recipe").trim(),
    time: Number(item?.time) || 20,
    level: validLevels.includes(item?.level) ? item.level : "Easy",
    tag:
      String(item?.tag || "").trim() ||
      (item?.foodType === "Non-Veg" ? "NON-VEG" : "VEG"), category: validCategories.includes(item?.category)
        ? item.category
        : "Dinner",
    foodType:
      item?.foodType === "Non-Veg"
        ? "Non-Veg"
        : "Veg",
    kitchenFriendly: Boolean(item?.kitchenFriendly),
    rating: String(item?.rating || "4.6"),
    reviews: Number(item?.reviews) || 50,
    ingredients: Array.isArray(item?.ingredients)
      ? item.ingredients.map((x) => String(x))
      : [],
    missingIngredients: Array.isArray(item?.missingIngredients)
      ? item.missingIngredients.map((x) => String(x))
      : [],
    steps: Array.isArray(item?.steps)
      ? item.steps.map((x) => String(x)).filter(Boolean)
      : [],
    servings: Number(item?.servings) || 4,
    chefTip: String(item?.chefTip || "").trim(),
    nutrition: normalizeNutrition(item?.nutrition),
    image: "",
    photographer: "",
    photographerUrl: "",
    pexelsUrl: "",
  };
}

app.post("/api/recipehub/suggest", async (req, res) => {
  try {
    const ingredients = Array.isArray(req.body.ingredients)
      ? req.body.ingredients.map((x) => String(x).trim()).filter(Boolean)
      : [];

    const language = String(req.body.language || "en").trim().toLowerCase();
    const queryText = String(req.body.queryText || "").trim();

    if (!ingredients.length && !queryText) {
      return res.status(400).json({
        error: "Please add at least one ingredient or type a recipe query.",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      temperature: 0.6,
      max_tokens: 4200,
      messages: [
        {
          role: "system",
          content:
            "You are RecipeHub AI. Return only valid json for a cooking app. Write detailed full recipe instructions.",
        },
        {
          role: "user",
          content: buildPrompt({
            ingredients,
            languageCode: language,
            queryText,
          }),
        },
      ],
    });

    const raw = completion?.choices?.[0]?.message?.content?.trim() || "{}";

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (error) {
      return res.status(500).json({
        error: "Invalid JSON returned by Groq.",
      });
    }

    const baseRecipes = Array.isArray(parsed?.recipes)
      ? parsed.recipes.map(normalizeRecipe)
      : [];

    const imageSeed = queryText || ingredients[0] || "recipe";

    const enrichedRecipes = await Promise.all(
      baseRecipes.map(async (recipe) => {
        const imageQuery = `${recipe.title} food`;
        const imageData =
          (await getRecipeImage(imageQuery)) ||
          (await getRecipeImage(`${imageSeed} recipe food`));

        return {
          ...recipe,
          image: imageData?.image || "",
          photographer: imageData?.photographer || "",
          photographerUrl: imageData?.photographerUrl || "",
          pexelsUrl: imageData?.pexelsUrl || "",
        };
      })
    );

    return res.json({
      recipes: enrichedRecipes,
    });
  } catch (error) {
    console.error("RecipeHub API error:", error);
    return res.status(500).json({
      error: "Failed to load recipes.",
      details: error.message,
    });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`RecipeHub API running on port ${process.env.PORT || 5000}`);
});