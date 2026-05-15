export async function fetchAiRecipes({
  ingredients = [],
  language = "en",
  queryText = "",
}) {
  const response = await fetch("http://localhost:5000/api/recipehub/suggest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
      language,
      queryText,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch recipes");
  }

  return data;
}

export async function refetchRecipesForLanguage(nextLanguage) {
  const raw = localStorage.getItem("recipehub_last_request");
  if (!raw) return null;

  const lastRequest = JSON.parse(raw);

  const data = await fetchAiRecipes({
    ingredients: Array.isArray(lastRequest.ingredients)
      ? lastRequest.ingredients
      : [],
    queryText: lastRequest.queryText || "",
    language: nextLanguage,
  });

  const recipes = Array.isArray(data?.recipes) ? data.recipes : [];

  localStorage.setItem("recipehub_ai_results", JSON.stringify(recipes));

  const selectedRaw = localStorage.getItem("recipehub_selected_recipe");
  if (selectedRaw) {
    try {
      const selected = JSON.parse(selectedRaw);
      const updatedSelected = recipes.find(
        (item) => String(item.id) === String(selected?.id)
      );

      if (updatedSelected) {
        localStorage.setItem(
          "recipehub_selected_recipe",
          JSON.stringify(updatedSelected)
        );
      }
    } catch (_) { }
  }

  return recipes;
}