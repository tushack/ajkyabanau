import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AppFlowHeader from "../pages/AppRecipeHeader";
import AppFooter from "../pages/AppFooter";
import { refetchRecipesForLanguage } from "../lib/recipeApi";

import {
  LANGUAGE_OPTIONS,
  getSavedLanguage,
  getUiText,
  setSavedLanguage,
} from "../lib/language";
import logo from "../assets/logo.png";


const extraTranslations = {
  en: {
    recipeNotFound: "Recipe not found",
    selectedRecipeMissing: "Selected recipe data was not found.",
    backToResults: "Back to results",
    cookTime: "Cook Time",
    difficulty: "Difficulty",
    rating: "Rating",
    stars: "Stars",
    culinaryJourney: "The Culinary Journey",
    prepareBase: "Prepare the Base",
    buildFlavor: "Build the Flavor",
    finishPerfection: "Finish to Perfection",
    finalTouches: "Final Touches",
    step: "Step",
    shared: "Shared",
    viewAll: "View all",
    comfortFood: "Comfort Food",
    footerRights: "© 2024 The Digital Epicurean. Artfully Curated.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    contact: "Contact",
    careers: "Careers",
  },
  hi: {
    recipeNotFound: "रेसिपी नहीं मिली",
    selectedRecipeMissing: "चुनी गई रेसिपी का डेटा नहीं मिला।",
    backToResults: "रिज़ल्ट्स पर वापस जाएँ",
    cookTime: "पकाने का समय",
    difficulty: "कठिनाई",
    rating: "रेटिंग",
    stars: "स्टार्स",
    culinaryJourney: "पूरी बनाने की विधि",
    prepareBase: "तैयारी करें",
    buildFlavor: "स्वाद तैयार करें",
    finishPerfection: "अंतिम पकाव",
    finalTouches: "अंतिम चरण",
    step: "स्टेप",
    shared: "शेयर हो गया",
    viewAll: "सभी देखें",
    comfortFood: "कंफर्ट फूड",
    footerRights: "© 2024 The Digital Epicurean. सभी अधिकार सुरक्षित।",
    privacyPolicy: "प्राइवेसी पॉलिसी",
    termsOfService: "सेवा की शर्तें",
    contact: "संपर्क",
    careers: "करियर",
  },
  ta: {
    recipeNotFound: "சமையல் குறிப்பு கிடைக்கவில்லை",
    selectedRecipeMissing: "தேர்ந்தெடுத்த சமையல் குறிப்பு தரவு கிடைக்கவில்லை.",
    backToResults: "முடிவுகளுக்கு திரும்பு",
    cookTime: "சமைக்கும் நேரம்",
    difficulty: "சிரம நிலை",
    rating: "மதிப்பீடு",
    stars: "நட்சத்திரங்கள்",
    culinaryJourney: "முழு செய்முறை",
    prepareBase: "தயாராக்குதல்",
    buildFlavor: "சுவையை உருவாக்குதல்",
    finishPerfection: "சரியாக முடித்தல்",
    finalTouches: "இறுதி செயல்",
    step: "படி",
    shared: "பகிரப்பட்டது",
    viewAll: "அனைத்தையும் காண்க",
    comfortFood: "கம்ஃபர்ட் உணவு",
    footerRights: "© 2024 The Digital Epicurean. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    privacyPolicy: "தனியுரிமைக் கொள்கை",
    termsOfService: "சேவை விதிமுறைகள்",
    contact: "தொடர்பு",
    careers: "வேலைவாய்ப்புகள்",
  },
  ml: {
    recipeNotFound: "റെസിപ്പി കണ്ടെത്തിയില്ല",
    selectedRecipeMissing: "തിരഞ്ഞെടുത്ത റെസിപ്പി ഡാറ്റ ലഭ്യമായില്ല.",
    backToResults: "ഫലങ്ങളിലേക്ക് മടങ്ങുക",
    cookTime: "പാചക സമയം",
    difficulty: "കഠിനത",
    rating: "റേറ്റിംഗ്",
    stars: "സ്റ്റാർസ്",
    culinaryJourney: "പൂർണ്ണ തയ്യാറാക്കുന്ന വിധം",
    prepareBase: "തയ്യാറെടുപ്പ്",
    buildFlavor: "രുചി കൂട്ടുക",
    finishPerfection: "സൂക്ഷ്മമായി പൂർത്തിയാക്കുക",
    finalTouches: "അവസാന ഘട്ടം",
    step: "ഘട്ടം",
    shared: "പങ്കിട്ടു",
    viewAll: "എല്ലാം കാണുക",
    comfortFood: "കമ്ഫർട്ട് ഫുഡ്",
    footerRights: "© 2024 The Digital Epicurean. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.",
    privacyPolicy: "സ്വകാര്യതാ നയം",
    termsOfService: "സേവന നിബന്ധനകൾ",
    contact: "ബന്ധപ്പെടുക",
    careers: "കരിയേഴ്സ്",
  },
  mr: {
    recipeNotFound: "रेसिपी सापडली नाही",
    selectedRecipeMissing: "निवडलेल्या रेसिपीचा डेटा मिळाला नाही.",
    backToResults: "रिझल्ट्सकडे परत जा",
    cookTime: "शिजवण्याचा वेळ",
    difficulty: "कठीणता",
    rating: "रेटिंग",
    stars: "स्टार्स",
    culinaryJourney: "पूर्ण बनवण्याची पद्धत",
    prepareBase: "तयारी करा",
    buildFlavor: "चव तयार करा",
    finishPerfection: "परफेक्ट पूर्ण करा",
    finalTouches: "शेवटचा टप्पा",
    step: "स्टेप",
    shared: "शेअर झाले",
    viewAll: "सर्व पहा",
    comfortFood: "कम्फर्ट फूड",
    footerRights: "© 2024 The Digital Epicurean. सर्व हक्क राखीव.",
    privacyPolicy: "गोपनीयता धोरण",
    termsOfService: "सेवा अटी",
    contact: "संपर्क",
    careers: "करिअर्स",
  },
  bn: {
    recipeNotFound: "রেসিপি পাওয়া যায়নি",
    selectedRecipeMissing: "নির্বাচিত রেসিপির তথ্য পাওয়া যায়নি।",
    backToResults: "রেজাল্টে ফিরে যান",
    cookTime: "রান্নার সময়",
    difficulty: "কঠিনতা",
    rating: "রেটিং",
    stars: "স্টার",
    culinaryJourney: "সম্পূর্ণ রান্নার পদ্ধতি",
    prepareBase: "প্রস্তুতি নিন",
    buildFlavor: "স্বাদ তৈরি করুন",
    finishPerfection: "শেষ ধাপ সম্পূর্ণ করুন",
    finalTouches: "শেষ স্পর্শ",
    step: "ধাপ",
    shared: "শেয়ার হয়েছে",
    viewAll: "সব দেখুন",
    comfortFood: "কমফোর্ট ফুড",
    footerRights: "© 2024 The Digital Epicurean. সর্বস্বত্ব সংরক্ষিত।",
    privacyPolicy: "প্রাইভেসি পলিসি",
    termsOfService: "সেবার শর্তাবলী",
    contact: "যোগাযোগ",
    careers: "ক্যারিয়ার",
  },
};

function BackIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.7 10.7l6.6-3.4M8.7 13.3l6.6 3.4"
      />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M6 3a2 2 0 00-2 2v16l8-4 8 4V5a2 2 0 00-2-2H6z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-[#8c5a16]"
    >
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 5a1 1 0 10-2 0v5c0 .265.105.52.293.707l3 3a1 1 0 101.414-1.414L13 11.586V7z" />
    </svg>
  );
}

function ForkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-[#8c5a16]"
    >
      <path d="M7 2a1 1 0 011 1v6a2 2 0 002 2V3a1 1 0 112 0v8a2 2 0 01-2 2v8a1 1 0 11-2 0v-8a4 4 0 01-4-4V3a1 1 0 011-1h1zm10 0a1 1 0 011 1v8h1a1 1 0 110 2h-1v8a1 1 0 11-2 0V3a1 1 0 011-1h1z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-[#e9a126]"
    >
      <path d="M12 2l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 15.8 6.7 18.1l1-5.8-4.2-4.1 5.9-.9L12 2z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5 text-[#94a3b8]"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-6 w-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18" />
    </svg>
  );
}

function formatTitleToHeading(title) {
  if (!title) return "Recipe Details";
  const parts = title.split(" ");
  if (parts.length <= 2) return title;
  const mid = Math.ceil(parts.length / 2);
  return `${parts.slice(0, mid).join(" ")}\n${parts.slice(mid).join(" ")}`;
}

export default function RecipeDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [allRecipes, setAllRecipes] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [shareStatus, setShareStatus] = useState("");
  const [language, setLanguageState] = useState(getSavedLanguage());
  const [searchText, setSearchText] = useState("");
  const activeTab = "browse";

  const t = getUiText(language);

  const tx = (key, vars = {}) => {
    const core = t(key, vars);
    if (core !== key) return core;

    let text =
      extraTranslations[language]?.[key] ??
      extraTranslations.en[key] ??
      key;

    Object.keys(vars).forEach((name) => {
      text = text.replaceAll(`{{${name}}}`, String(vars[name]));
    });

    return text;
  };

  const categoryLabel = (value) => {
    const map = {
      Breakfast: t("breakfast"),
      Dinner: t("dinner"),
      Desserts: t("desserts"),
    };
    return map[value] || value;
  };

  const dietaryLabel = (value) => {
    const map = {
      Vegetarian: extraTranslations[language]?.vegetarian ?? value,
      Vegan: extraTranslations[language]?.vegan ?? value,
      "Gluten-Free": extraTranslations[language]?.glutenFree ?? value,
    };
    return map[value] || value;
  };

  const handleLanguageChange = async (e) => {
    const nextLanguage = e.target.value;
    setLanguageState(nextLanguage);
    setSavedLanguage(nextLanguage);

    try {
      const updatedRecipes = await refetchRecipesForLanguage(nextLanguage);

      if (Array.isArray(updatedRecipes)) {
        setAllRecipes(updatedRecipes);

        const updatedCurrent = updatedRecipes.find(
          (item) => String(item.id) === String(id)
        );

        if (updatedCurrent) {
          setRecipe(updatedCurrent);
          localStorage.setItem(
            "recipehub_selected_recipe",
            JSON.stringify(updatedCurrent)
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const storedSelected = localStorage.getItem("recipehub_selected_recipe");
      const selected = storedSelected ? JSON.parse(storedSelected) : null;

      const storedAll = localStorage.getItem("recipehub_ai_results");
      const all = storedAll ? JSON.parse(storedAll) : [];

      const storedFavorites = localStorage.getItem("foodie-favorites");
      const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      setAllRecipes(Array.isArray(all) ? all : []);
      setFavoriteIds(Array.isArray(parsedFavorites) ? parsedFavorites : []);

      if (selected && String(selected.id) === String(id)) {
        setRecipe(selected);
        return;
      }

      const matched = Array.isArray(all)
        ? all.find((item) => String(item.id) === String(id))
        : null;

      setRecipe(matched || null);
    } catch {
      setRecipe(null);
      setAllRecipes([]);
      setFavoriteIds([]);
    }
  }, [id]);

  const isSaved = useMemo(() => {
    if (!recipe) return false;
    return favoriteIds.includes(recipe.id);
  }, [favoriteIds, recipe]);

  const ingredients = useMemo(() => {
    if (!recipe) return [];
    if (Array.isArray(recipe.ingredients) && recipe.ingredients.length) {
      return recipe.ingredients;
    }
    if (
      Array.isArray(recipe.missingIngredients) &&
      recipe.missingIngredients.length
    ) {
      return recipe.missingIngredients;
    }
    return [
      "Chicken breast",
      "Lemon",
      "Garlic",
      "Fresh herbs",
      "Olive oil",
      "Salt & pepper",
    ];
  }, [recipe]);

  const steps = useMemo(() => {
    if (!recipe) return [];
    if (Array.isArray(recipe.steps) && recipe.steps.length) {
      return recipe.steps;
    }
    return [
      "Prepare all ingredients and season well.",
      "Heat a pan and cook until golden and aromatic.",
      "Finish gently, plate nicely, and serve warm.",
    ];
  }, [recipe]);

  const relatedRecipes = useMemo(() => {
    if (!recipe || !Array.isArray(allRecipes)) return [];
    return allRecipes
      .filter((item) => String(item.id) !== String(recipe.id))
      .slice(0, 3);
  }, [allRecipes, recipe]);

  const nutrition = useMemo(() => {
    if (recipe?.nutrition) {
      return {
        calories: Number(recipe.nutrition.calories) || 320,
        protein: Number(recipe.nutrition.protein) || 24,
        fat: Number(recipe.nutrition.fat) || 14,
        carbs: Number(recipe.nutrition.carbs) || 10,
      };
    }

    const time = Number(recipe?.time) || 25;
    return {
      calories: Math.max(220, time * 12),
      protein: recipe?.category === "Desserts" ? 8 : 42,
      fat: recipe?.category === "Desserts" ? 14 : 18,
      carbs: recipe?.category === "Desserts" ? 32 : 9,
    };
  }, [recipe]);

  const servings = useMemo(() => {
    return Number(recipe?.servings) || 4;
  }, [recipe]);

  const chefTip = useMemo(() => {
    if (recipe?.chefTip) return recipe.chefTip;
    return recipe?.level === "Easy"
      ? "For best results, keep the ingredients dry before cooking so you get better browning and clean flavor."
      : "Let the dish rest briefly before serving so the flavors settle and the texture stays balanced.";
  }, [recipe]);

  const toggleIngredient = (item) => {
    setCheckedItems((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const openRelatedRecipe = (item) => {
    localStorage.setItem("recipehub_selected_recipe", JSON.stringify(item));
    navigate(`/recipe/${item.id}`);
  };

  const toggleSaveRecipe = () => {
    if (!recipe) return;

    const updatedFavorites = favoriteIds.includes(recipe.id)
      ? favoriteIds.filter((item) => item !== recipe.id)
      : [...favoriteIds, recipe.id];

    setFavoriteIds(updatedFavorites);
    localStorage.setItem("foodie-favorites", JSON.stringify(updatedFavorites));

    const storedSavedRecipes = localStorage.getItem("recipehub_saved_recipes");
    const parsedSavedRecipes = storedSavedRecipes
      ? JSON.parse(storedSavedRecipes)
      : [];

    const safeSavedRecipes = Array.isArray(parsedSavedRecipes)
      ? parsedSavedRecipes
      : [];

    const recipeExists = safeSavedRecipes.some(
      (item) => String(item.id) === String(recipe.id)
    );

    const updatedSavedRecipes = recipeExists
      ? safeSavedRecipes.filter((item) => String(item.id) !== String(recipe.id))
      : [recipe, ...safeSavedRecipes];

    localStorage.setItem(
      "recipehub_saved_recipes",
      JSON.stringify(updatedSavedRecipes)
    );
  };

  const handleShareRecipe = async () => {
    if (!recipe) return;

    const shareUrl = window.location.href;
    const shareText = `${recipe.title} - ${recipe.description}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.title,
          text: shareText,
          url: shareUrl,
        });
        setShareStatus(tx("shared"));
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(`${recipe.title}\n${shareUrl}`);
        setShareStatus(tx("shareCopied"));
      } else {
        const input = document.createElement("textarea");
        input.value = `${recipe.title}\n${shareUrl}`;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
        setShareStatus(tx("shareCopied"));
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareStatus(tx("shareFailed"));
      }
    }

    setTimeout(() => {
      setShareStatus("");
    }, 2000);
  };

  const getStepTitle = (index) => {
    if (index === 0) return tx("prepareBase");
    if (index === 1) return tx("buildFlavor");
    if (index === 2) return tx("finishPerfection");
    if (index === 3) return tx("finalTouches");
    return `${tx("step")} ${index + 1}`;
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-[#f6f3ee] px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#111111]">
          {tx("recipeNotFound")}
        </h2>
        <p className="mt-3 text-[#666666]">{tx("selectedRecipeMissing")}</p>
        <button
          onClick={() => navigate("/search-results")}
          className="mt-6 rounded-full bg-[#a96800] px-6 py-3 font-medium text-white"
        >
          {tx("backToResults")}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f3ee] text-[#151515]">
      <AppFlowHeader
        t={t}
        language={language}
        onLanguageChange={handleLanguageChange}
        active={activeTab === "browse" ? "recipes" : "saved"}
        showSearch={true}
        searchText={searchText}
        onSearchChange={setSearchText}
        recipesPath="/search-results"
        savedPath="/search-results?tab=favorites"
        savedLabel={t("myKitchen")}
      />

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-[14px]">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="h-[390px] w-full object-cover"
            />

            <div className="absolute bottom-5 left-5 right-5 rounded-[14px] bg-[#f6f3ee]/95 px-6 py-5 shadow-lg backdrop-blur-sm">
              <div className="grid gap-5 md:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#8b775e]">
                    {tx("cookTime")}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <ClockIcon />
                    <span className="text-[16px] font-medium">{recipe.time}m</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#8b775e]">
                    {tx("difficulty")}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <ForkIcon />
                    <span className="text-[16px] font-medium">{recipe.level}</span>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#8b775e]">
                    {tx("rating")}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <StarIcon />
                    <span className="text-[16px] font-medium">
                      {recipe.rating} {tx("stars")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="mb-4 flex gap-2">
              {recipe.category && (
                <span className="rounded-full bg-[#dfeaf0] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#4c6f86]">
                  {categoryLabel(recipe.category)}
                </span>
              )}
              {recipe.tag && (
                <span className="rounded-full bg-[#ece7e0] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#6f6557]">
                  {recipe.tag}
                </span>
              )}
            </div>

            <h1 className="whitespace-pre-line text-[52px] font-bold leading-[0.92] tracking-[-0.05em] text-[#111111]">
              {formatTitleToHeading(recipe.title)}
            </h1>

            <p className="mt-5 max-w-[520px] text-[24px] leading-[1.55] text-[#4f4a43]">
              {recipe.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={toggleSaveRecipe}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-4 text-[15px] font-semibold ${isSaved
                  ? "bg-[#c07b0a] text-white"
                  : "bg-[#9d6200] text-white"
                  }`}
              >
                <BookmarkIcon />
                {isSaved ? t("savedRecipe") : t("saveRecipe")}
              </button>

              <button
                onClick={handleShareRecipe}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d7cdbf] text-[#6d5b45]"
              >
                <ShareIcon />
              </button>

              <button
                onClick={() => navigate("/search-results")}
                className="inline-flex items-center gap-2 rounded-full border border-[#d7cdbf] px-5 py-4 text-[14px] text-[#5e564e]"
              >
                <BackIcon />
                {t("back")}
              </button>
            </div>

            {shareStatus && (
              <p className="mt-4 text-[14px] font-medium text-[#9d6200]">
                {shareStatus}
              </p>
            )}
          </div>
        </section>

        <section className="mt-14 grid gap-10 lg:grid-cols-[1fr_310px]">
          <div>
            <h2 className="text-[44px] font-bold tracking-[-0.04em] text-[#111111]">
              {tx("culinaryJourney")}
            </h2>

            <div className="mt-8 space-y-10">
              {steps.map((step, index) => (
                <div key={index} className="relative pl-0">
                  <div className="absolute -left-2 top-0 text-[82px] font-bold leading-none text-[#dbd6cf]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="relative z-10 pt-9">
                    <h3 className="text-[28px] font-semibold text-[#111111]">
                      {getStepTitle(index)}
                    </h3>
                    <p className="mt-3 max-w-[820px] text-[22px] leading-[1.7] text-[#4f4a43]">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 rounded-[18px] bg-[#efebe4] p-8">
              <h3 className="text-[28px] font-semibold text-[#111111]">
                {t("nutritionalProfile")}
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-[12px] bg-white px-6 py-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b775e]">
                    {t("calories")}
                  </p>
                  <p className="mt-3 text-[34px] font-bold text-[#9d6200]">
                    {nutrition.calories}
                  </p>
                </div>

                <div className="rounded-[12px] bg-white px-6 py-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b775e]">
                    {t("protein")}
                  </p>
                  <p className="mt-3 text-[34px] font-bold text-[#9d6200]">
                    {nutrition.protein}g
                  </p>
                </div>

                <div className="rounded-[12px] bg-white px-6 py-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b775e]">
                    {t("fat")}
                  </p>
                  <p className="mt-3 text-[34px] font-bold text-[#9d6200]">
                    {nutrition.fat}g
                  </p>
                </div>

                <div className="rounded-[12px] bg-white px-6 py-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#8b775e]">
                    {t("carbs")}
                  </p>
                  <p className="mt-3 text-[34px] font-bold text-[#9d6200]">
                    {nutrition.carbs}g
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-[44px] font-bold tracking-[-0.04em] text-[#111111]">
                  {t("youMightAlsoLike")}
                </h3>
{/* 
                <button className="text-[14px] font-medium text-[#8b3d00]">
                  {tx("viewAll")} {categoryLabel(recipe.category || t("recipes"))} →
                </button> */}
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {relatedRecipes.map((item) => (
                  <Link
                    key={item.id}
                    to={`/recipe/${item.id}`}
                    onClick={() =>
                      localStorage.setItem(
                        "recipehub_selected_recipe",
                        JSON.stringify(item)
                      )
                    }
                    className="block text-left"
                  >
                    <div className="overflow-hidden rounded-[14px] bg-white">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-[220px] w-full object-cover"
                      />
                    </div>

                    <div className="mt-4 flex items-start justify-between gap-3">
                      <h4 className="text-[18px] font-semibold leading-[1.35] text-[#111111]">
                        {item.title}
                      </h4>
                      <span className="pt-1 text-[12px] text-[#5c564f]">
                        {item.time}m
                      </span>
                    </div>

                    <p className="mt-2 text-[13px] text-[#6f695f]">
                      {Array.isArray(item.dietary) && item.dietary.length
                        ? item.dietary.map(dietaryLabel).join(" • ")
                        : tx("comfortFood")}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <aside>
            <div className="rounded-[16px] bg-[#fbf9f6] p-7 shadow-sm ring-1 ring-[#ece4d8]">
              <div className="flex items-center justify-between">
                <h3 className="text-[20px] font-semibold text-[#111111]">
                  {t("ingredients")}
                </h3>
                <span className="text-[13px] text-[#6a645b]">
                  {t("serves", { count: servings })}
                </span>
              </div>

              <div className="mt-6 space-y-5">
                {ingredients.map((item, index) => (
                  <label
                    key={index}
                    className="flex cursor-pointer items-start gap-3 text-[16px] text-[#3f3a33]"
                  >
                    <input
                      type="checkbox"
                      checked={checkedItems.includes(item)}
                      onChange={() => toggleIngredient(item)}
                      className="mt-1 h-4 w-4 rounded border-[#d8cfbf]"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <button className="mt-8 w-full rounded-full border border-[#d7cdbf] px-5 py-4 text-[14px] font-medium text-[#1f1a14]">
                {t("addAllToBasket")}
              </button>
            </div>

            <div className="mt-4 rounded-[16px] border-l-4 border-[#eda32b] bg-[#f3e7d5] p-6">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[#8c5a16]">
                {t("chefsTip")}
              </div>
              <p className="mt-3 text-[14px] leading-7 text-[#6c5b45]">
                {chefTip}
              </p>
            </div>
          </aside>
        </section>
      </main>
      <AppFooter />

    </div>
  );
}