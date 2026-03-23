import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchAiRecipes } from "../lib/recipeApi";

export default function Inputingredients() {
    const [input, setInput] = useState("");
    const [ingredients, setIngredients] = useState([
        "Chicken Breast",
        "Fresh Basil",
        "Parmesan",
        "Cherry Tomatoes",
    ]);

    const popularItems = ["Onion", "Eggs", "Pasta", "Spinach"];
    const navigate = useNavigate();
    const [loadingRecipes, setLoadingRecipes] = useState(false);

    const handleFindRecipes = async () => {
        try {
            setLoadingRecipes(true);

            const data = await fetchAiRecipes(ingredients);

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

        const alreadyExists = ingredients.some(
            (item) => item.toLowerCase() === trimmed.toLowerCase()
        );

        if (!alreadyExists) {
            setIngredients([...ingredients, trimmed]);
        }

        setInput("");
    };

    const removeIngredient = (itemToRemove) => {
        setIngredients(ingredients.filter((item) => item !== itemToRemove));
    };

    const clearAll = () => {
        setIngredients([]);
    };

    return (
        <div className="min-h-screen bg-[#f8f7f4] text-[#0d1830]">
            {/* Header */}
            <header className="border-b border-[#e9dcc8] bg-[#f8f7f4]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-12">
                    <div className="flex items-center gap-3">
                        <div className="text-[#eb9f25] text-3xl">🍴</div>
                        <h1 className="text-[20px] sm:text-[24px] font-bold text-[#111827]">
                            RecipeFinder
                        </h1>
                    </div>

                    <nav className="hidden md:flex items-center gap-10 text-[16px] font-medium text-[#111827]">
                        <a href="#" className="hover:text-[#eb9f25]">
                            Home
                        </a>
                        <a href="#" className="hover:text-[#eb9f25]">
                            Recipes
                        </a>
                        <a href="#" className="hover:text-[#eb9f25]">
                            Saved
                        </a>
                    </nav>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#efc7ae] text-[18px]">
                        📄
                    </div>
                </div>
            </header>

            {/* Main */}
            <main className="mx-auto max-w-5xl px-6 py-12 lg:px-8">
                {/* Top Heading */}
                <section>
                    <h2 className="text-[42px] sm:text-[56px] font-bold leading-tight text-[#091734]">
                        What's in your fridge?
                    </h2>
                    <p className="mt-3 text-[20px] text-[#5a6d8c]">
                        Enter the ingredients you have to find the perfect recipe matches.
                    </p>
                </section>

                {/* Search Box */}
                <section className="mt-10 rounded-[30px] border border-[#eee1cf] bg-white px-6 py-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        <div className="flex h-[70px] flex-1 items-center rounded-full border border-[#ead8c0] bg-[#fbfbfa] px-6">
                            <span className="mr-3 text-[24px] text-[#8da0ba]">⌕</span>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") addIngredient(input);
                                }}
                                placeholder="e.g. Tomato, Chicken, Garlic"
                                className="w-full bg-transparent text-[20px] text-[#49566d] outline-none placeholder:text-[#7f8ea5]"
                            />
                        </div>

                        <button
                            onClick={() => addIngredient(input)}
                            className="h-[70px] rounded-full bg-[#eea228] px-8 text-[18px] font-semibold text-white transition hover:scale-[1.01]"
                        >
                            + Add Ingredient
                        </button>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3 text-[16px] text-[#71829d]">
                        <span className="font-medium">Popular:</span>
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

                {/* Added Ingredients */}
                <section className="mt-10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-[22px] font-bold text-[#111827]">
                            Added Ingredients
                        </h3>

                        <button
                            onClick={clearAll}
                            className="text-[16px] text-[#64748b] hover:text-[#eea228]"
                        >
                            🗑 Clear All
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
                                    No ingredients added yet.
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Divider */}
                <div className="my-10 border-t border-[#eadfcd]" />

                {/* CTA */}
                <section className="text-center">
                    <button
                        onClick={handleFindRecipes}
                        className="inline-flex h-[72px] items-center justify-center gap-3 rounded-full bg-[#eea228] px-14 text-[22px] font-semibold text-white shadow-md transition hover:scale-[1.02]"
                    >
                        {loadingRecipes ? "Finding..." : "Find Recipes"}
                        <span className="text-[28px]">→</span>
                    </button>

                    <p className="mt-5 text-[18px] text-[#71829d]">
                        We found 42 recipes you can make right now!
                    </p>
                </section>
            </main>

            {/* Bottom Feature Strip */}
            <section className="mt-16 border-t border-[#eadfcd] bg-[#fbfaf7]">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3 lg:px-10">
                    <div>
                        <div className="mb-4 text-[30px] text-[#eea228]">💡</div>
                        <h4 className="text-[18px] font-bold text-[#111827]">Pro Tip</h4>
                        <p className="mt-3 text-[16px] leading-7 text-[#5f6f86]">
                            Add staple items like flour, oil, and salt for better search
                            results.
                        </p>
                    </div>

                    <div>
                        <div className="mb-4 text-[30px] text-[#eea228]">⏱</div>
                        <h4 className="text-[18px] font-bold text-[#111827]">
                            Fast Filter
                        </h4>
                        <p className="mt-3 text-[16px] leading-7 text-[#5f6f86]">
                            Once you search, you can filter by cooking time and difficulty
                            level.
                        </p>
                    </div>

                    <div>
                        <div className="mb-4 text-[30px] text-[#eea228]">❤</div>
                        <h4 className="text-[18px] font-bold text-[#111827]">
                            Save for later
                        </h4>
                        <p className="mt-3 text-[16px] leading-7 text-[#5f6f86]">
                            Sign in to save your current pantry and favorite recipes.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}