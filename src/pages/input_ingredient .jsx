import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAiRecipes } from "../lib/recipeApi";
import logo from "../assets/logo.png";

import {
  LANGUAGE_OPTIONS,
  getSavedLanguage,
  getUiText,
  setSavedLanguage,
} from "../lib/language";


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

export default function Inputingredients() {
  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([

  ]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguageState] = useState(getSavedLanguage());
  const t = getUiText(language);
  const popularItems = ["Onion", "Eggs", "Pasta", "Spinach"];
  const navigate = useNavigate();
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const looksLikeRecipeQuery = (value) => {
    const text = value.trim().toLowerCase();
    if (!text) return false;

    return (
      text.includes("how to make") ||
      text.includes("recipe for") ||
      text.includes("how can i make") ||
      text.includes("kaise banaye") ||
      text.includes("kaise banao") ||
      text.includes("recipe btao") ||
      text.includes("recipe batao") ||
      text.includes("mujhe") ||
      text.includes("banao") ||
      text.includes("banane ki recipe") ||
      text.split(" ").length >= 3
    );
  };

  const handleFindRecipes = async () => {
    const typedText = input.trim();
    const hasIngredients = ingredients.length > 0;
    const hasTypedText = typedText.length > 0;

    if (!hasTypedText && !hasIngredients) {
      setValidationMessage(t("validationAddIngredients"));
      return;
    }

    setValidationMessage("");

    try {
      setLoadingRecipes(true);

      const queryMode = looksLikeRecipeQuery(typedText);

      const data = await fetchAiRecipes({
        ingredients: queryMode ? [] : ingredients,
        language,
        queryText: queryMode ? typedText : "",
      });

      localStorage.setItem(
        "recipehub_ai_results",
        JSON.stringify(data.recipes || [])
      );

      navigate("/search-results");
    } catch (error) {
      console.error(error);
      alert("Recipes load nahi huye. Dobara try karo.");
    } finally {
      setLoadingRecipes(false);
    }
  };

  const addIngredient = (value) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (looksLikeRecipeQuery(trimmed)) {
      setInput(trimmed);
      return;
    }

    const alreadyExists = ingredients.some(
      (item) => item.toLowerCase() === trimmed.toLowerCase()
    );

    if (!alreadyExists) {
      setIngredients([...ingredients, trimmed]);
    }
    setValidationMessage("");
    setInput("");
  };

  const removeIngredient = (itemToRemove) => {
    setIngredients(ingredients.filter((item) => item !== itemToRemove));
    setValidationMessage("");
  };

  const clearAll = () => {
    setIngredients([]);
    setValidationMessage("");
  };

  const handleLanguageChange = (e) => {
    const nextLanguage = e.target.value;
    setLanguageState(nextLanguage);
    setSavedLanguage(nextLanguage);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#0d1830]">
      <header className="border-b border-[#e9dcc8] bg-[#f8f7f4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-12">
          <div className="flex items-center gap-3">
              <img src={logo} alt="RecipeHub" className="h-12 w-12 rounded-full object-cover" />
            <button
              onClick={() => navigate("/")}
              className="text-[18px] sm:text-[24px] font-bold text-[#111827]"
            >
              Aj Kya Banega
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-[16px] font-medium text-[#111827]">
            <button onClick={() => navigate("/")} className="hover:text-[#eb9f25]">
              {t("home")}
            </button>
            <button
              onClick={() => navigate("/search-results")}
              className="hover:text-[#eb9f25]"
            >
              {t("recipes")}
            </button>
            <button
              onClick={() => navigate("/search-results?tab=favorites")}
              className="hover:text-[#eb9f25]"
            >
              {t("saved")}
            </button>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-[14px] font-medium text-[#475569]">
              {t("language")}
            </span>

            <div className="rounded-full border border-[#ead8c0] bg-white px-4 py-3">
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-[14px] font-medium text-[#111827] outline-none"
              >
                {LANGUAGE_OPTIONS.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigate("/search-results?tab=favorites")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efc7ae] text-[18px]"
            >
              📄
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#ead8c0] bg-white text-[#111827] md:hidden"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#ead8c0] bg-white px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/");
                }}
                className="rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#111827] hover:bg-[#faf4ea]"
              >
                {t("home")}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/search-results");
                }}
                className="rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#111827] hover:bg-[#faf4ea]"
              >
                {t("recipes")}
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/search-results?tab=favorites");
                }}
                className="rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#111827] hover:bg-[#faf4ea]"
              >
                {t("saved")}
              </button>

              <div className="mt-2 rounded-2xl border border-[#ead8c0] bg-[#fbfaf7] px-4 py-3">
                <div className="mb-2 text-[13px] font-medium text-[#475569]">
                  {t("language")}
                </div>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="w-full rounded-xl border border-[#ead8c0] bg-white px-3 py-3 text-[14px] font-medium text-[#111827] outline-none"
                >
                  {LANGUAGE_OPTIONS.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* <header className="border-b border-[#e9dcc8] bg-[#f8f7f4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="text-[#eb9f25] text-3xl">🍴</div>
            <h1 className="text-[20px] sm:text-[24px] font-bold text-[#111827]">
              RecipeFinder
            </h1>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-[16px] font-medium text-[#111827]">
            <button onClick={() => navigate("/")} className="hover:text-[#eb9f25]">
              {t("home")}
            </button>
            <button
              onClick={() => navigate("/search-results")}
              className="hover:text-[#eb9f25]"
            >
              {t("recipes")}
            </button>
            <button
              onClick={() => navigate("/search-results?tab=favorites")}
              className="hover:text-[#eb9f25]"
            >
              {t("saved")}
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 rounded-full border border-[#ead8c0] bg-white px-4 py-3">
              <span className="text-[14px] font-medium text-[#475569]">
                {t("language")}
              </span>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-transparent text-[14px] font-medium text-[#111827] outline-none"
              >
                {LANGUAGE_OPTIONS.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => navigate("/search-results?tab=favorites")}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efc7ae] text-[18px]"
            >
              📄
            </button>
          </div>
        </div>
      </header> */}

      <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
        <section>
          <h2 className="text-[42px] sm:text-[56px] font-bold leading-tight text-[#091734]">
            {t("whatsInFridge")}
          </h2>
          <p className="mt-3 text-[20px] text-[#5a6d8c]">
            {t("fridgeSubtitle")}
          </p>
        </section>

        <section className="mt-10 rounded-[30px] border border-[#eee1cf] bg-white px-6 py-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex h-[70px] flex-1 items-center rounded-full border border-[#ead8c0] bg-[#fbfbfa] px-6">
              <span className="mr-3 text-[24px] text-[#8da0ba]">⌕</span>
              <input
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (validationMessage) setValidationMessage("");
                }} onKeyDown={(e) => {
                  if (e.key === "Enter") handleFindRecipes();
                }}
                placeholder='e.g. Tomato, Chicken, Garlic or "How to make Maggie?"'
                className="w-full bg-transparent text-[20px] text-[#49566d] outline-none placeholder:text-[#7f8ea5]"
              />
            </div>

            <button
              onClick={() => addIngredient(input)}
              className="h-[70px] rounded-full bg-[#eea228] px-8 text-[18px] font-semibold text-white transition hover:scale-[1.01]"
            >
              {t("addIngredient")}
            </button>
          </div>
          {validationMessage && (
            <div className="mt-4 rounded-2xl border border-[#f3c58b] bg-[#fff4e5] px-4 py-3 text-[15px] font-medium text-[#9a5b00]">
              {validationMessage}
            </div>
          )}

          <p className="mt-4 text-[15px] leading-7 text-[#7b879b]">
            Ingredient bhi add kar sakte ho, aur direct aise bhi likh sakte ho:
            <span className="font-medium text-[#49566d]">
              {" "}
              “How to make Maggie?”
            </span>
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-[16px] text-[#71829d]">
            <span className="font-medium">{t("popular")}</span>
            {popularItems.map((item, index) => (
              <button
                key={index}
                onClick={() => addIngredient(item)}
                className="underline underline-offset-4 hover:text-[#eea228]"
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h3 className="text-[22px] font-bold text-[#111827]">
              {t("addedIngredients")}
            </h3>

            <button
              onClick={clearAll}
              className="text-[16px] text-[#64748b] hover:text-[#eea228]"
            >
              {t("clearAll")}
            </button>
          </div>

          <div className="mt-5 min-h-[140px] rounded-[28px] border-2 border-dashed border-[#efd7b3] bg-[#fcfaf6] px-6 py-7">
            <div className="flex flex-wrap gap-4">
              {ingredients.length > 0 ? (
                ingredients.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-full border border-[#eadfce] bg-white px-5 py-3 text-[16px] font-medium text-[#1f2937] shadow-sm"
                  >
                    <span>{item}</span>
                    <button
                      onClick={() => removeIngredient(item)}
                      className="text-[#8da0ba] hover:text-red-500"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-[#94a3b8] text-[17px]">
                  {t("noIngredients")}
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="my-10 border-t border-[#eadfcd]" />

        <section className="text-center">
          <button
            onClick={handleFindRecipes}
            className="inline-flex h-[72px] items-center justify-center gap-3 rounded-full bg-[#eea228] px-14 text-[22px] font-semibold text-white shadow-md transition hover:scale-[1.02]"
          >
            {loadingRecipes ? t("finding") : t("findRecipes")}
            <span className="text-[28px]">→</span>
          </button>

          <p className="mt-5 text-[18px] text-[#71829d]">
            {t("recipesNow")}
          </p>
        </section>
      </main>

      <section className="mt-16 border-t border-[#eadfcd] bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3 lg:px-10">
          <div>
            <div className="mb-4 text-[30px] text-[#eea228]">💡</div>
            <h4 className="text-[18px] font-bold text-[#111827]">
              {t("proTip")}
            </h4>
            <p className="mt-3 text-[16px] leading-7 text-[#5f6f86]">
              {t("proTipText")}
            </p>
          </div>

          <div>
            <div className="mb-4 text-[30px] text-[#eea228]">⏱</div>
            <h4 className="text-[18px] font-bold text-[#111827]">
              {t("fastFilter")}
            </h4>
            <p className="mt-3 text-[16px] leading-7 text-[#5f6f86]">
              {t("fastFilterText")}
            </p>
          </div>

          <div>
            <div className="mb-4 text-[30px] text-[#eea228]">❤</div>
            <h4 className="text-[18px] font-bold text-[#111827]">
              {t("saveForLater")}
            </h4>
            <p className="mt-3 text-[16px] leading-7 text-[#5f6f86]">
              {t("saveForLaterText")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}