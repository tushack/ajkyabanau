export async function fetchAiRecipes(ingredients) {
  const response = await fetch("http://localhost:5000/api/recipehub/suggest", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ingredients }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch recipes");
  }

  return data;
}