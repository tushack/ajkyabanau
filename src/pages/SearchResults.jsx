import { useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import AppFlowHeader from "../pages/AppRecipeHeader";
import {
  LANGUAGE_OPTIONS,
  getSavedLanguage,
  getUiText,
  setSavedLanguage,
} from "../lib/language";
import logo from "../assets/logo.png";


const extraTranslations = {
  en: {
    veg: "Veg",
    nonVeg: "Non-Veg",
    noImageAvailable: "No image available",
    reviews: "reviews",
    viewRecipe: "View Recipe",
    loadingRecipesSubtext: "Please wait while we prepare your recipe list.",
    somethingWentWrong: "Something went wrong",
    failedToReadRecipeData: "Failed to read recipe data.",
    noRecipesFound: "No recipes found",
    tryDifferent: "Try different filters or search terms.",
    noFavoritesYet:
      "You have not saved any recipes yet. Click the heart icon and they will appear here.",
    explore: "Explore",
    browseRecipes: "Browse Recipes",
    mealPlans: "Meal Plans",
    cookingTips: "Cooking Tips",
    support: "Support",
    helpCenter: "Help Center",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    newsletter: "Newsletter",
    yourEmail: "Your email",
    footerDesc:
      "Discover the joy of cooking with thousands of recipes curated just for you. From quick weeknight dinners to elaborate weekend feasts.",
    footerRights:
      "© 2024 FoodieRecipes. All rights reserved. Made with love for food.",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
    glutenFree: "Gluten-Free",
  },
  hi: {
    veg: "शाकाहारी",
    nonVeg: "नॉन-वेज",
    noImageAvailable: "कोई इमेज उपलब्ध नहीं है",
    reviews: "रिव्यू",
    viewRecipe: "रेसिपी देखें",
    loadingRecipesSubtext: "कृपया प्रतीक्षा करें, आपकी रेसिपीज़ तैयार की जा रही हैं।",
    somethingWentWrong: "कुछ गलत हो गया",
    failedToReadRecipeData: "रेसिपी डेटा पढ़ा नहीं जा सका।",
    noRecipesFound: "कोई रेसिपी नहीं मिली",
    tryDifferent: "अलग फ़िल्टर या खोज शब्द आज़माएँ।",
    noFavoritesYet:
      "आपने अभी तक कोई रेसिपी सेव नहीं की है। हार्ट आइकन पर क्लिक करें।",
    explore: "एक्सप्लोर",
    browseRecipes: "रेसिपीज़ ब्राउज़ करें",
    mealPlans: "मील प्लान्स",
    cookingTips: "कुकिंग टिप्स",
    support: "सहायता",
    helpCenter: "हेल्प सेंटर",
    contactUs: "संपर्क करें",
    privacyPolicy: "प्राइवेसी पॉलिसी",
    newsletter: "न्यूज़लेटर",
    yourEmail: "आपका ईमेल",
    footerDesc:
      "आपके लिए चुनी गई हजारों रेसिपीज़ के साथ खाना बनाने का आनंद खोजिए। जल्दी बनने वाले डिनर से लेकर खास दावतों तक।",
    footerRights:
      "© 2024 FoodieRecipes. सर्वाधिकार सुरक्षित। प्यार से बनाया गया।",
    vegetarian: "शाकाहारी",
    vegan: "वीगन",
    glutenFree: "ग्लूटेन-फ्री",
  },
  ta: {
    veg: "சைவம்",
    nonVeg: "அசைவம்",
    noImageAvailable: "படம் கிடைக்கவில்லை",
    reviews: "மதிப்புரைகள்",
    viewRecipe: "சமையல் குறிப்பை பார்க்க",
    loadingRecipesSubtext: "உங்கள் சமையல் குறிப்புகள் தயாராகின்றன. தயவு செய்து காத்திருக்கவும்.",
    somethingWentWrong: "ஏதோ தவறு ஏற்பட்டது",
    failedToReadRecipeData: "சமையல் தரவை படிக்க முடியவில்லை.",
    noRecipesFound: "சமையல் குறிப்புகள் கிடைக்கவில்லை",
    tryDifferent: "வேறு வடிகட்டிகள் அல்லது தேடல் சொல்லை முயற்சிக்கவும்.",
    noFavoritesYet:
      "இன்னும் பிடித்த குறிப்புகள் சேமிக்கப்படவில்லை. ஹார்ட் ஐகானை அழுத்தவும்.",
    explore: "ஆராயுங்கள்",
    browseRecipes: "குறிப்புகளை உலாவுங்கள்",
    mealPlans: "உணவு திட்டங்கள்",
    cookingTips: "சமையல் குறிப்புகள்",
    support: "ஆதரவு",
    helpCenter: "உதவி மையம்",
    contactUs: "எங்களை தொடர்பு கொள்ள",
    privacyPolicy: "தனியுரிமைக் கொள்கை",
    newsletter: "செய்திமடல்",
    yourEmail: "உங்கள் மின்னஞ்சல்",
    footerDesc:
      "உங்களுக்கு தேர்ந்தெடுக்கப்பட்ட ஆயிரக்கணக்கான சமையல் குறிப்புகளுடன் சமையலின் மகிழ்ச்சியை அறியுங்கள்.",
    footerRights:
      "© 2024 FoodieRecipes. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
    vegetarian: "சைவம்",
    vegan: "வீகன்",
    glutenFree: "குளூட்டன் இல்லாது",
  },
  ml: {
    veg: "സസ്യാഹാരം",
    nonVeg: "നോൺ-വെജ്",
    noImageAvailable: "ചിത്രം ലഭ്യമല്ല",
    reviews: "റിവ്യൂകൾ",
    viewRecipe: "റെസിപ്പി കാണുക",
    loadingRecipesSubtext: "നിങ്ങളുടെ റെസിപ്പികൾ തയ്യാറാക്കുന്നു. ദയവായി കാത്തിരിക്കുക.",
    somethingWentWrong: "എന്തോ പിശക് സംഭവിച്ചു",
    failedToReadRecipeData: "റെസിപ്പി ഡാറ്റ വായിക്കാനായില്ല.",
    noRecipesFound: "റെസിപ്പികൾ കണ്ടെത്തിയില്ല",
    tryDifferent: "മറ്റൊരു ഫിൽട്ടർ അല്ലെങ്കിൽ തിരച്ചിൽ വാക്ക് പരീക്ഷിക്കുക.",
    noFavoritesYet:
      "ഇനിയും പ്രിയപ്പെട്ട റെസിപ്പികൾ സേവ് ചെയ്തിട്ടില്ല. ഹാർട്ട് ഐക്കൺ അമർത്തുക.",
    explore: "എക്സ്പ്ലോർ",
    browseRecipes: "റെസിപ്പികൾ ബ്രൗസ് ചെയ്യുക",
    mealPlans: "മീൽ പ്ലാനുകൾ",
    cookingTips: "പാചക ടിപ്പുകൾ",
    support: "സഹായം",
    helpCenter: "ഹെൽപ്പ് സെന്റർ",
    contactUs: "ബന്ധപ്പെടുക",
    privacyPolicy: "സ്വകാര്യതാ നയം",
    newsletter: "ന്യൂസ്‌ലെറ്റർ",
    yourEmail: "നിങ്ങളുടെ ഇമെയിൽ",
    footerDesc:
      "നിങ്ങൾക്കായി തെരഞ്ഞെടുത്ത ആയിരക്കണക്കിന് റെസിപ്പികളിലൂടെ പാചകത്തിന്റെ സന്തോഷം കണ്ടെത്തൂ.",
    footerRights:
      "© 2024 FoodieRecipes. എല്ലാ അവകാശങ്ങളും സംരക്ഷിച്ചിരിക്കുന്നു.",
    vegetarian: "സസ്യാഹാരം",
    vegan: "വീഗൻ",
    glutenFree: "ഗ്ലൂട്ടൻ-ഫ്രീ",
  },
  mr: {
    veg: "शाकाहारी",
    nonVeg: "नॉन-वेज",
    noImageAvailable: "प्रतिमा उपलब्ध नाही",
    reviews: "रिव्ह्यूज",
    viewRecipe: "रेसिपी पहा",
    loadingRecipesSubtext: "तुमच्या रेसिपीज तयार केल्या जात आहेत. कृपया थांबा.",
    somethingWentWrong: "काहीतरी चूक झाली",
    failedToReadRecipeData: "रेसिपी डेटा वाचता आला नाही.",
    noRecipesFound: "रेसिपीज सापडल्या नाहीत",
    tryDifferent: "वेगळे फिल्टर्स किंवा शोध शब्द वापरा.",
    noFavoritesYet:
      "अजून कोणतीही फेव्हरेट रेसिपी सेव केलेली नाही. हार्ट आयकॉन क्लिक करा.",
    explore: "एक्सप्लोर",
    browseRecipes: "रेसिपीज ब्राउझ करा",
    mealPlans: "मील प्लॅन्स",
    cookingTips: "कुकिंग टिप्स",
    support: "सपोर्ट",
    helpCenter: "हेल्प सेंटर",
    contactUs: "संपर्क करा",
    privacyPolicy: "प्रायव्हसी पॉलिसी",
    newsletter: "न्यूजलेटर",
    yourEmail: "तुमचा ईमेल",
    footerDesc:
      "तुमच्यासाठी निवडलेल्या हजारो रेसिपीजसह स्वयंपाकाचा आनंद शोधा.",
    footerRights:
      "© 2024 FoodieRecipes. सर्व हक्क राखीव. प्रेमाने बनवलेले.",
    vegetarian: "शाकाहारी",
    vegan: "व्हेगन",
    glutenFree: "ग्लूटेन-फ्री",
  },
  bn: {
    veg: "নিরামিষ",
    nonVeg: "নন-ভেজ",
    noImageAvailable: "কোনো ছবি পাওয়া যায়নি",
    reviews: "রিভিউ",
    viewRecipe: "রেসিপি দেখুন",
    loadingRecipesSubtext: "আপনার রেসিপি প্রস্তুত করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।",
    somethingWentWrong: "কিছু ভুল হয়েছে",
    failedToReadRecipeData: "রেসিপি ডেটা পড়া যায়নি।",
    noRecipesFound: "কোনো রেসিপি পাওয়া যায়নি",
    tryDifferent: "অন্য ফিল্টার বা সার্চ শব্দ ব্যবহার করুন।",
    noFavoritesYet:
      "এখনও কোনো ফেভারিট রেসিপি সংরক্ষণ করা হয়নি। হার্ট আইকনে ক্লিক করুন।",
    explore: "এক্সপ্লোর",
    browseRecipes: "রেসিপি ব্রাউজ করুন",
    mealPlans: "মিল প্ল্যান",
    cookingTips: "কুকিং টিপস",
    support: "সাপোর্ট",
    helpCenter: "হেল্প সেন্টার",
    contactUs: "যোগাযোগ করুন",
    privacyPolicy: "প্রাইভেসি পলিসি",
    newsletter: "নিউজলেটার",
    yourEmail: "আপনার ইমেইল",
    footerDesc:
      "আপনার জন্য বাছাই করা হাজারো রেসিপির সাথে রান্নার আনন্দ আবিষ্কার করুন।",
    footerRights:
      "© 2024 FoodieRecipes. সর্বস্বত্ব সংরক্ষিত। ভালোবাসা দিয়ে তৈরি।",
    vegetarian: "নিরামিষ",
    vegan: "ভেগান",
    glutenFree: "গ্লুটেন-ফ্রি",
  },
};

function HeartIcon({ active }) {
  return (
    <FaHeart
      className={`h-5 w-5 transition ${active ? "text-[#ef9f24]" : "text-[#94a3b8]"
        }`}
    />
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-5 w-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-[#64748b]"
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
      className="h-4 w-4 text-[#64748b]"
    >
      <path d="M7 2a1 1 0 011 1v6a2 2 0 002 2V3a1 1 0 112 0v8a2 2 0 01-2 2v8a1 1 0 11-2 0v-8a4 4 0 01-4-4V3a1 1 0 011-1h1zm10 0a1 1 0 011 1v8h1a1 1 0 110 2h-1v8a1 1 0 11-2 0V3a1 1 0 011-1h1z" />
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

function CheckCircle({ active }) {
  return (
    <span
      className={`flex h-4 w-4 items-center justify-center rounded-full border transition ${active
        ? "border-[#ef9f24] bg-[#ef9f24]"
        : "border-[#cbd5e1] bg-transparent"
        }`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
    </span>
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

function RecipeCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onOpenRecipe,
  tx,
}) {
  return (
    <div
      onClick={() => onOpenRecipe(recipe)}
      className="cursor-pointer overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-[#eee2cf]"
    >
      <div className="relative h-[230px] overflow-hidden bg-[#f4efe7]">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#64748b]">
            {tx("noImageAvailable")}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
        >
          <HeartIcon active={isFavorite} />
        </button>

        {recipe.tag && (
          <div className="absolute bottom-4 left-4 rounded-full bg-[#0f172a] px-3 py-1 text-[12px] font-semibold text-white">
            {recipe.tag}
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-center gap-1 text-[14px]">
          <span className="text-[#ef9f24]">★</span>
          <span className="font-semibold text-[#ef9f24]">{recipe.rating}</span>
          <span className="text-[#94a3b8]">
            ({recipe.reviews} {tx("reviews")})
          </span>
        </div>

        <h3 className="min-h-[64px] text-[20px] font-semibold leading-[1.25] text-[#111827]">
          {recipe.title}
        </h3>

        <div className="mt-5 flex items-center justify-between border-t border-[#edf0f4] pt-4">
          <div className="flex items-center gap-5 text-[14px] text-[#64748b]">
            <div className="flex items-center gap-2">
              <ClockIcon />
              <span>{recipe.time}m</span>
            </div>
            <div className="flex items-center gap-2">
              <ForkIcon />
              <span>{recipe.level}</span>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenRecipe(recipe);
            }}
            className="text-[#ef9f24]"
          >
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function RecipeListCard({
  recipe,
  isFavorite,
  onToggleFavorite,
  onOpenRecipe,
  tx,
  categoryLabel,
}) {
  return (
    <div
      onClick={() => onOpenRecipe(recipe)}
      className="cursor-pointer flex flex-col overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-[#eee2cf] md:flex-row"
    >
      <div className="relative h-[240px] w-full bg-[#f4efe7] md:h-auto md:w-[320px]">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#64748b]">
            {tx("noImageAvailable")}
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(recipe);
          }}
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
        >
          <HeartIcon active={isFavorite} />
        </button>

        {recipe.tag && (
          <div className="absolute bottom-4 left-4 rounded-full bg-[#0f172a] px-3 py-1 text-[12px] font-semibold text-white">
            {recipe.tag}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="mb-2 flex items-center gap-1 text-[14px]">
            <span className="text-[#ef9f24]">★</span>
            <span className="font-semibold text-[#ef9f24]">{recipe.rating}</span>
            <span className="text-[#94a3b8]">
              ({recipe.reviews} {tx("reviews")})
            </span>
          </div>

          <h3 className="text-[28px] font-semibold leading-tight text-[#111827]">
            {recipe.title}
          </h3>

          <p className="mt-3 text-[15px] leading-7 text-[#64748b]">
            {recipe.description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#edf0f4] pt-4">
          <div className="flex items-center gap-5 text-[14px] text-[#64748b]">
            <div className="flex items-center gap-2">
              <ClockIcon />
              <span>{recipe.time}m</span>
            </div>
            <div className="flex items-center gap-2">
              <ForkIcon />
              <span>{recipe.level}</span>
            </div>
            <div className="rounded-full bg-[#faf2e5] px-3 py-1 text-[12px] font-medium text-[#ef9f24]">
              {categoryLabel(recipe.category)}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenRecipe(recipe);
            }}
            className="flex items-center gap-2 rounded-full bg-[#ef9f24] px-5 py-3 font-medium text-white"
          >
            {tx("viewRecipe")}
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SearchResults() {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabFromQuery = (search) => {
    const tab = new URLSearchParams(search).get("tab");
    if (tab === "favorites") return "favorites";
    if (tab === "mykitchen") return "mykitchen";
    return "browse";
  };

  const [activeTab, setActiveTab] = useState(getTabFromQuery(location.search));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguageState] = useState(getSavedLanguage());
  const t = getUiText(language);
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedDietary, setSelectedDietary] = useState("");
  const [selectedTimeDifficulty, setSelectedTimeDifficulty] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Recipes");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

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

  const dietaryLabel = (value) => {
    const map = {
      Veg: tx("veg"),
      "Non-Veg": tx("nonVeg"),
    };
    return map[value] || value;
  };

  const categoryLabel = (value) => {
    const map = {
      "All Recipes": t("allRecipes"),
      Breakfast: t("breakfast"),
      Dinner: t("dinner"),
      Desserts: t("desserts"),
    };
    return map[value] || value;
  };

  const breadcrumbLabel =
    activeTab === "favorites"
      ? t("favorites")
      : activeTab === "mykitchen"
        ? t("myKitchen")
        : t("recipeResults");

  const categories = useMemo(() => {
    const dynamic = [
      ...new Set(recipes.map((item) => item.category).filter(Boolean)),
    ];
    return ["All Recipes", ...dynamic];
  }, [recipes]);

  useEffect(() => {
    const saved = localStorage.getItem("foodie-favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFavoriteIds(Array.isArray(parsed) ? parsed : []);
      } catch {
        setFavoriteIds([]);
      }
    }

    const storedSavedRecipes = localStorage.getItem("recipehub_saved_recipes");
    if (storedSavedRecipes) {
      try {
        const parsedSavedRecipes = JSON.parse(storedSavedRecipes);
        setSavedRecipes(Array.isArray(parsedSavedRecipes) ? parsedSavedRecipes : []);
      } catch {
        setSavedRecipes([]);
      }
    }
  }, []);

  useEffect(() => {
    setActiveTab(getTabFromQuery(location.search));
  }, [location.search]);

  const handleLanguageChange = (e) => {
    const nextLanguage = e.target.value;
    setLanguageState(nextLanguage);
    setSavedLanguage(nextLanguage);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recipehub_ai_results");
      const parsed = stored ? JSON.parse(stored) : [];
      setRecipes(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      setRecipes([]);
      setApiError("failedToReadRecipeData");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("foodie-favorites", JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    activeTab,
    viewMode,
    searchText,
    selectedDietary,
    selectedTimeDifficulty,
    selectedCategory,
  ]);

  const toggleDietary = (value) => {
    setSelectedDietary((prev) => (prev === value ? "" : value));
  };

  const toggleTimeDifficulty = (value) => {
    setSelectedTimeDifficulty((prev) => (prev === value ? "" : value));
  };

  const toggleFavorite = (recipe) => {
    const isAlreadyFavorite = favoriteIds.includes(recipe.id);

    const updatedFavoriteIds = isAlreadyFavorite
      ? favoriteIds.filter((item) => item !== recipe.id)
      : [...favoriteIds, recipe.id];

    setFavoriteIds(updatedFavoriteIds);
    localStorage.setItem("foodie-favorites", JSON.stringify(updatedFavoriteIds));

    const updatedSavedRecipes = isAlreadyFavorite
      ? savedRecipes.filter((item) => String(item.id) !== String(recipe.id))
      : [recipe, ...savedRecipes.filter((item) => String(item.id) !== String(recipe.id))];

    setSavedRecipes(updatedSavedRecipes);
    localStorage.setItem(
      "recipehub_saved_recipes",
      JSON.stringify(updatedSavedRecipes)
    );
  };

  const openRecipe = (recipe) => {
    localStorage.setItem("recipehub_selected_recipe", JSON.stringify(recipe));
    navigate(`/recipe/${recipe.id}`);
  };

  const baseRecipes = useMemo(() => {
    if (activeTab === "favorites") {
      return savedRecipes;
    }

    if (activeTab === "mykitchen") {
      return recipes.filter((recipe) => recipe.kitchenFriendly);
    }

    return recipes;
  }, [activeTab, savedRecipes, recipes]);

  const filteredRecipes = useMemo(() => {
    return baseRecipes.filter((recipe) => {
      const matchesSearch = (recipe.title || "")
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Recipes" ||
        recipe.category === selectedCategory;

      const matchesDietary =
        !selectedDietary || recipe.foodType === selectedDietary;

      const matchesTimeDifficulty =
        !selectedTimeDifficulty ||
        (selectedTimeDifficulty === "under15" && Number(recipe.time) <= 15) ||
        (selectedTimeDifficulty === "easy" && recipe.level === "Easy");

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDietary &&
        matchesTimeDifficulty
      );
    });
  }, [
    baseRecipes,
    searchText,
    selectedCategory,
    selectedDietary,
    selectedTimeDifficulty,
  ]);

  const itemsPerPage = viewMode === "grid" ? 6 : 4;
  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / itemsPerPage));

  const paginatedRecipes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecipes.slice(start, start + itemsPerPage);
  }, [filteredRecipes, currentPage, itemsPerPage]);

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const heading =
    activeTab === "favorites"
      ? t("favoriteRecipes")
      : activeTab === "mykitchen"
        ? t("myKitchenRecipes")
        : t("recipeResults");

  const subHeading =
    activeTab === "favorites"
      ? t("savedCount", { count: filteredRecipes.length })
      : activeTab === "mykitchen"
        ? t("kitchenCount", { count: filteredRecipes.length })
        : t("foundMatches", { count: filteredRecipes.length });

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#0f172a]">
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

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-5 flex items-center gap-3 text-[14px] text-[#64748b]">
          <span>{t("home")}</span>
          <span>›</span>
          <span className="text-[#334155]">{breadcrumbLabel}</span>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-[42px] font-bold leading-none text-[#0f172a]">
              {heading}
            </h2>
            <p className="mt-2 text-[18px] text-[#64748b]">{subHeading}</p>
          </div>

          <div className="inline-flex w-fit rounded-full bg-white p-1 shadow-sm ring-1 ring-[#eee2cf]">
            <button
              onClick={() => setViewMode("grid")}
              className={`rounded-full px-6 py-3 text-[16px] font-medium transition ${viewMode === "grid"
                ? "bg-[#ef9f24] text-white"
                : "text-[#475569]"
                }`}
            >
              {t("grid")}
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-full px-6 py-3 text-[16px] transition ${viewMode === "list"
                ? "bg-[#ef9f24] text-white"
                : "text-[#475569]"
                }`}
            >
              {t("list")}
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
          <aside className="h-fit rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#eee2cf]">
            <div className="mb-7 flex items-center gap-3">
              <span className="text-[#ef9f24]">⚙</span>
              <h3 className="text-[18px] font-semibold">{t("filters")}</h3>
            </div>

            <div className="mb-8">
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                {t("dietary")}
              </p>
              <div className="space-y-3 text-[16px] text-[#475569]">
                {["Veg", "Non-Veg"].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleDietary(item)}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <CheckCircle active={selectedDietary === item} />                    {dietaryLabel(item)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                {t("timeDifficulty")}
              </p>
              <div className="space-y-3 text-[16px] text-[#475569]">
                <button
                  onClick={() => toggleTimeDifficulty("under15")}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <CheckCircle active={selectedTimeDifficulty === "under15"} />
                  {t("under15")}
                </button>

                <button
                  onClick={() => toggleTimeDifficulty("easy")}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <CheckCircle active={selectedTimeDifficulty === "easy"} />
                  {t("easyDifficulty")}
                </button>
              </div>
            </div>

            <div>
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                {t("category")}
              </p>

              <div className="space-y-3 text-[16px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full rounded-full px-4 py-3 text-left transition ${selectedCategory === category
                      ? "border border-[#f1cf9c] bg-[#faf2e5] text-[#ef9f24]"
                      : "text-[#475569]"
                      }`}
                  >
                    {categoryLabel(category)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDietary("");
                setSelectedTimeDifficulty("");
                setSelectedCategory("All Recipes");
                setSearchText("");
              }}
              className="mt-8 w-full rounded-full border border-[#eee2cf] px-4 py-3 text-[15px] font-medium text-[#475569] transition hover:bg-[#faf2e5]"
            >
              {t("clearFilters")}
            </button>
          </aside>

          <section>
            {loading ? (
              <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-[#eee2cf]">
                <div className="text-5xl">🍽</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  {t("loadingRecipes")}
                </h3>
                <p className="mt-3 text-[#64748b]">
                  {tx("loadingRecipesSubtext")}
                </p>
              </div>
            ) : apiError ? (
              <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-[#eee2cf]">
                <div className="text-5xl">⚠️</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  {tx("somethingWentWrong")}
                </h3>
                <p className="mt-3 text-[#64748b]">{tx(apiError)}</p>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-[#eee2cf]">
                <div className="text-5xl">💛</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  {tx("noRecipesFound")}
                </h3>
                <p className="mt-3 text-[#64748b]">
                  {activeTab === "favorites"
                    ? tx("noFavoritesYet")
                    : tx("tryDifferent")}
                </p>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {paginatedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favoriteIds.includes(recipe.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenRecipe={openRecipe}
                    tx={tx}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {paginatedRecipes.map((recipe) => (
                  <RecipeListCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={favoriteIds.includes(recipe.id)}
                    onToggleFavorite={toggleFavorite}
                    onOpenRecipe={openRecipe}
                    tx={tx}
                    categoryLabel={categoryLabel}
                  />
                ))}
              </div>
            )}

            {!loading && !apiError && filteredRecipes.length > 0 && totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eedfc9] bg-white text-[#475569]"
                >
                  ‹
                </button>

                {pageNumbers.map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${currentPage === page
                      ? "bg-[#ef9f24] text-white"
                      : "border border-[#eedfc9] bg-white text-[#64748b]"
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#eedfc9] bg-white text-[#475569]"
                >
                  ›
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      <footer className="mt-20 border-t border-[#eee2cf] bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <img src={logo} alt="Aj Kya banega" className="h-12 w-12 rounded-full object-cover" />
              <h3 className="text-[18px] font-bold">Aj Kya banega</h3>
            </div>
            <p className="max-w-[260px] text-[15px] leading-7 text-[#64748b]">
              {tx("footerDesc")}
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[18px] font-semibold">{tx("explore")}</h4>
            <div className="space-y-3 text-[15px] text-[#64748b]">
              <p>{tx("browseRecipes")}</p>
              <p>{tx("mealPlans")}</p>
              <p>{tx("cookingTips")}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[18px] font-semibold">{tx("support")}</h4>
            <div className="space-y-3 text-[15px] text-[#64748b]">
              <p>{tx("helpCenter")}</p>
              <p>{tx("contactUs")}</p>
              <p>{tx("privacyPolicy")}</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[18px] font-semibold">{tx("newsletter")}</h4>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder={tx("yourEmail")}
                className="h-12 flex-1 rounded-full bg-[#f1f5f9] px-5 text-[15px] outline-none placeholder:text-[#94a3b8]"
              />
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef9f24] text-xl text-white">
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl border-t border-[#edf0f4] px-6 py-6 text-center text-[14px] text-[#94a3b8] lg:px-10">
          {tx("footerRights")}
        </div>
      </footer>
    </div>
  );
}