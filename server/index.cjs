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

function buildPrompt(ingredients) {
    return `
Return only valid json.

The user has these ingredients:
${ingredients.join(", ")}

Generate 8 recipes that can realistically be made using these ingredients.
Use a few common pantry ingredients only when needed.

Return this exact json shape:
{
  "recipes": [
    {
      "id": "recipe-1",
      "title": "string",
      "description": "string",
      "time": 20,
      "level": "Easy",
      "tag": "QUICK",
      "category": "Dinner",
      "dietary": ["Vegetarian"],
      "kitchenFriendly": true,
      "rating": "4.7",
      "reviews": 120,
      "missingIngredients": ["salt", "oil"],
      "steps": ["step 1", "step 2", "step 3"]
    }
  ]
}

Rules:
- Output only json
- No markdown
- No explanation outside json
- time must be a number
- level must be Easy, Medium, or Hard
- category must be Breakfast, Dinner, or Desserts
- dietary must be an array
- rating should be between 4.1 and 5.0
- reviews should be an integer
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

function normalizeRecipe(item, index) {
    const validLevels = ["Easy", "Medium", "Hard"];
    const validCategories = ["Breakfast", "Dinner", "Desserts"];

    return {
        id: item?.id || `recipe-${index + 1}`,
        title: String(item?.title || `Recipe ${index + 1}`).trim(),
        description: String(item?.description || "Tasty recipe").trim(),
        time: Number(item?.time) || 20,
        level: validLevels.includes(item?.level) ? item.level : "Easy",
        tag: String(item?.tag || "").trim(),
        category: validCategories.includes(item?.category)
            ? item.category
            : "Dinner",
        dietary: Array.isArray(item?.dietary)
            ? item.dietary.map((x) => String(x))
            : [],
        kitchenFriendly: Boolean(item?.kitchenFriendly),
        rating: String(item?.rating || "4.6"),
        reviews: Number(item?.reviews) || 50,
        missingIngredients: Array.isArray(item?.missingIngredients)
            ? item.missingIngredients.map((x) => String(x))
            : [],
        steps: Array.isArray(item?.steps) ? item.steps.map((x) => String(x)) : [],
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

        if (!ingredients.length) {
            return res.status(400).json({
                error: "Please add at least one ingredient.",
            });
        }

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            temperature: 0.6,
            max_tokens: 1800,
            messages: [
                {
                    role: "system",
                    content:
                        "You are RecipeHub AI. Return only valid json for a cooking app.",
                },
                {
                    role: "user",
                    content: buildPrompt(ingredients),
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

        const enrichedRecipes = await Promise.all(
            baseRecipes.map(async (recipe) => {
                const imageQuery = `${recipe.title} food`;
                const imageData =
                    (await getRecipeImage(imageQuery)) ||
                    (await getRecipeImage(`${ingredients[0]} recipe food`));

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