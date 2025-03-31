import { useEffect, useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Statistics from "../components/Statistics";

const RecipeList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 6;


  const [searchTerm, setSearchTerm] = useState("");
  const { recipes, deleteRecipe } = useRecipes();
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const allCategories = Array.from(
    new Set(recipes.map((r) => r.category.trim().toLowerCase()))
  );

  // Filter by search (title + ingredients) and category
  const filteredRecipes = recipes.filter((r) => {
    const title = r.title.trim().toLowerCase();
    const search = searchTerm.trim().toLowerCase();

    const matchesTitle = title.includes(search);
    const matchesIngredients = r.ingredients.some((ing) =>
      ing.name.toLowerCase().includes(search)
    );

    const matchesCategoryFilter =
      selectedCategories.length === 0 ||
      selectedCategories.includes(r.category.trim().toLowerCase());

    return matchesCategoryFilter && (matchesTitle || matchesIngredients);
  });

  // Pagination Logic
  const indexOfLast = currentPage * recipesPerPage;
  const indexOfFirst = indexOfLast - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  //  Reset to first page when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategories]);

  // Stats for color coding
  const calorieValues = recipes.map((r) => r.nutritionalInfo.calories);
  const maxCalories = Math.max(...calorieValues);
  const minCalories = Math.min(...calorieValues);
  const avgCalories =
    calorieValues.reduce((sum, val) => sum + val, 0) / calorieValues.length;

    console.log("AVG Calories:", avgCalories);


  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Search + Add Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search recipes by name or ingredient..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 border border-gray-300 p-2 rounded shadow-sm"
        />
        <button
          onClick={() => navigate("/add")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 whitespace-nowrap"
        >
          + Add Recipe
        </button>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-1 rounded border ${
            selectedCategories.length === 0
              ? "bg-blue-500 text-white"
              : "bg-white"
          }`}
          onClick={() => setSelectedCategories([])}
        >
          All
        </button>
        {allCategories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          const label = category.charAt(0).toUpperCase() + category.slice(1);
          return (
            <button
              key={category}
              className={`px-4 py-1 rounded border ${
                isSelected ? "bg-blue-500 text-white" : "bg-white"
              }`}
              onClick={() =>
                setSelectedCategories((prev) =>
                  isSelected
                    ? prev.filter((c) => c !== category)
                    : [...prev, category]
                )
              }
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Recipe Cards */}
      <div className="flex flex-wrap gap-6">
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDelete={deleteRecipe}
            calorieStats={{ max: maxCalories, min: minCalories, avg: avgCalories }}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <Statistics />
    </div>
    
  );
};

export default RecipeList;
