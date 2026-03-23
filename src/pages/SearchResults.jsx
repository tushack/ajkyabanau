import { useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";

function HeartIcon({ active }) {
  return (
    <FaHeart
      className={`h-5 w-5 transition ${
        active ? "text-[#ef9f24]" : "text-[#94a3b8]"
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
      className={`flex h-4 w-4 items-center justify-center rounded-full border transition ${
        active
          ? "border-[#ef9f24] bg-[#ef9f24]"
          : "border-[#cbd5e1] bg-transparent"
      }`}
    >
      {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
    </span>
  );
}

function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <div className="overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-[#eee2cf]">
      <div className="relative h-[230px] overflow-hidden bg-[#f4efe7]">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#64748b]">
            No image available
          </div>
        )}

        <button
          onClick={() => onToggleFavorite(recipe.id)}
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
          <span className="text-[#94a3b8]">({recipe.reviews} reviews)</span>
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

          <button className="text-[#ef9f24]">
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

function RecipeListCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-[#eee2cf] md:flex-row">
      <div className="relative h-[240px] w-full bg-[#f4efe7] md:h-auto md:w-[320px]">
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#64748b]">
            No image available
          </div>
        )}

        <button
          onClick={() => onToggleFavorite(recipe.id)}
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
            <span className="text-[#94a3b8]">({recipe.reviews} reviews)</span>
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
              {recipe.category}
            </div>
          </div>

          <button className="flex items-center gap-2 rounded-full bg-[#ef9f24] px-5 py-3 font-medium text-white">
            View Recipe
            <ArrowIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SearchResults() {
  const [activeTab, setActiveTab] = useState("browse");
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [under15, setUnder15] = useState(false);
  const [easyOnly, setEasyOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Recipes");
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

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
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("recipehub_ai_results");
      const parsed = stored ? JSON.parse(stored) : [];
      setRecipes(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      setRecipes([]);
      setApiError("Failed to read recipe data.");
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
    under15,
    easyOnly,
    selectedCategory,
  ]);

  const toggleDietary = (value) => {
    setSelectedDietary((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const baseRecipes = useMemo(() => {
    if (activeTab === "favorites") {
      return recipes.filter((recipe) => favoriteIds.includes(recipe.id));
    }

    if (activeTab === "mykitchen") {
      return recipes.filter((recipe) => recipe.kitchenFriendly);
    }

    if (activeTab === "home") {
      return recipes;
    }

    return recipes;
  }, [activeTab, favoriteIds, recipes]);

  const filteredRecipes = useMemo(() => {
    return baseRecipes.filter((recipe) => {
      const matchesSearch = (recipe.title || "")
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Recipes" ||
        recipe.category === selectedCategory;

      const matchesDietary =
        selectedDietary.length === 0 ||
        selectedDietary.every((diet) =>
          Array.isArray(recipe.dietary) ? recipe.dietary.includes(diet) : false
        );

      const matchesTime = under15 ? Number(recipe.time) <= 15 : true;
      const matchesLevel = easyOnly ? recipe.level === "Easy" : true;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDietary &&
        matchesTime &&
        matchesLevel
      );
    });
  }, [
    baseRecipes,
    searchText,
    selectedCategory,
    selectedDietary,
    under15,
    easyOnly,
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
      ? "Favorite Recipes"
      : activeTab === "mykitchen"
      ? "My Kitchen Recipes"
      : "Recipe Results";

  const subHeading =
    activeTab === "favorites"
      ? `You saved ${filteredRecipes.length} recipe${
          filteredRecipes.length === 1 ? "" : "s"
        }`
      : activeTab === "mykitchen"
      ? `Found ${filteredRecipes.length} kitchen-friendly recipes`
      : `Found ${filteredRecipes.length} delicious matches for your craving`;

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-[#0f172a]">
      <header className="border-b border-[#eee2cf] bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="text-[30px] text-[#ef9f24]">🍴</div>
            <h1 className="text-[20px] font-bold">FoodieRecipes</h1>
          </div>

          <nav className="hidden items-center gap-9 md:flex">
            <button
              onClick={() => setActiveTab("home")}
              className={`text-[16px] ${
                activeTab === "home"
                  ? "font-medium text-[#ef9f24]"
                  : "text-[#334155]"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setActiveTab("browse")}
              className={`text-[16px] ${
                activeTab === "browse"
                  ? "font-medium text-[#ef9f24]"
                  : "text-[#334155]"
              }`}
            >
              Browse
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`text-[16px] ${
                activeTab === "favorites"
                  ? "font-medium text-[#ef9f24]"
                  : "text-[#334155]"
              }`}
            >
              Favorites
            </button>

            <button
              onClick={() => setActiveTab("mykitchen")}
              className={`text-[16px] ${
                activeTab === "mykitchen"
                  ? "font-medium text-[#ef9f24]"
                  : "text-[#334155]"
              }`}
            >
              My Kitchen
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 rounded-full border border-[#eee2cf] bg-white px-4 py-3 md:flex md:w-[230px]">
              <SearchIcon />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search recipes..."
                className="w-full bg-transparent text-[14px] text-[#475569] outline-none placeholder:text-[#94a3b8]"
              />
            </div>

            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#eee2cf] bg-[#f8efe2] text-[#a16207]">
              👤
              {favoriteIds.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#ef9f24] px-1 text-[11px] font-bold text-white">
                  {favoriteIds.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-5 flex items-center gap-3 text-[14px] text-[#64748b]">
          <span>Home</span>
          <span>›</span>
          <span className="text-[#334155]">
            {activeTab === "favorites"
              ? "Favorites"
              : activeTab === "mykitchen"
              ? "My Kitchen"
              : "Search Results"}
          </span>
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
              className={`rounded-full px-6 py-3 text-[16px] font-medium transition ${
                viewMode === "grid"
                  ? "bg-[#ef9f24] text-white"
                  : "text-[#475569]"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`rounded-full px-6 py-3 text-[16px] transition ${
                viewMode === "list"
                  ? "bg-[#ef9f24] text-white"
                  : "text-[#475569]"
              }`}
            >
              List
            </button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[230px_1fr]">
          <aside className="h-fit rounded-[28px] bg-white p-6 shadow-sm ring-1 ring-[#eee2cf]">
            <div className="mb-7 flex items-center gap-3">
              <span className="text-[#ef9f24]">⚙</span>
              <h3 className="text-[18px] font-semibold">Filters</h3>
            </div>

            <div className="mb-8">
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                Dietary
              </p>
              <div className="space-y-3 text-[16px] text-[#475569]">
                {["Vegetarian", "Vegan", "Gluten-Free"].map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleDietary(item)}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <CheckCircle active={selectedDietary.includes(item)} />
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                Time & Difficulty
              </p>
              <div className="space-y-3 text-[16px] text-[#475569]">
                <button
                  onClick={() => setUnder15((prev) => !prev)}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <CheckCircle active={under15} />
                  Under 15 mins
                </button>

                <button
                  onClick={() => setEasyOnly((prev) => !prev)}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <CheckCircle active={easyOnly} />
                  Easy Difficulty
                </button>
              </div>
            </div>

            <div>
              <p className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#94a3b8]">
                Category
              </p>

              <div className="space-y-3 text-[16px]">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full rounded-full px-4 py-3 text-left transition ${
                      selectedCategory === category
                        ? "border border-[#f1cf9c] bg-[#faf2e5] text-[#ef9f24]"
                        : "text-[#475569]"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedDietary([]);
                setUnder15(false);
                setEasyOnly(false);
                setSelectedCategory("All Recipes");
                setSearchText("");
              }}
              className="mt-8 w-full rounded-full border border-[#eee2cf] px-4 py-3 text-[15px] font-medium text-[#475569] transition hover:bg-[#faf2e5]"
            >
              Clear Filters
            </button>
          </aside>

          <section>
            {loading ? (
              <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-[#eee2cf]">
                <div className="text-5xl">🍽</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  Loading recipes...
                </h3>
                <p className="mt-3 text-[#64748b]">
                  Please wait while we prepare your recipe list.
                </p>
              </div>
            ) : apiError ? (
              <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-[#eee2cf]">
                <div className="text-5xl">⚠️</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  Something went wrong
                </h3>
                <p className="mt-3 text-[#64748b]">{apiError}</p>
              </div>
            ) : filteredRecipes.length === 0 ? (
              <div className="rounded-[28px] bg-white p-10 text-center shadow-sm ring-1 ring-[#eee2cf]">
                <div className="text-5xl">💛</div>
                <h3 className="mt-4 text-2xl font-semibold text-[#111827]">
                  No recipes found
                </h3>
                <p className="mt-3 text-[#64748b]">
                  {activeTab === "favorites"
                    ? "Abhi tak koi recipe favorite nahi ki hai. Heart icon pe click karo, phir yahan show hogi."
                    : "Try different filters or search terms."}
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
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      currentPage === page
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
              <div className="text-[30px] text-[#ef9f24]">🍴</div>
              <h3 className="text-[18px] font-bold">FoodieRecipes</h3>
            </div>
            <p className="max-w-[260px] text-[15px] leading-7 text-[#64748b]">
              Discover the joy of cooking with thousands of recipes curated just
              for you. From quick weeknight dinners to elaborate weekend feasts.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-[18px] font-semibold">Explore</h4>
            <div className="space-y-3 text-[15px] text-[#64748b]">
              <p>Browse Recipes</p>
              <p>Meal Plans</p>
              <p>Cooking Tips</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[18px] font-semibold">Support</h4>
            <div className="space-y-3 text-[15px] text-[#64748b]">
              <p>Help Center</p>
              <p>Contact Us</p>
              <p>Privacy Policy</p>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-[18px] font-semibold">Newsletter</h4>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Your email"
                className="h-12 flex-1 rounded-full bg-[#f1f5f9] px-5 text-[15px] outline-none placeholder:text-[#94a3b8]"
              />
              <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ef9f24] text-xl text-white">
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl border-t border-[#edf0f4] px-6 py-6 text-center text-[14px] text-[#94a3b8] lg:px-10">
          © 2024 FoodieRecipes. All rights reserved. Made with love for food.
        </div>
      </footer>
    </div>
  );
}