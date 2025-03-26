import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Recipe, Ingredient } from "../types/Recipe";
import { useRecipes } from "../context/RecipeContext";

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, updateRecipe } = useRecipes();

  const recipeToEdit = recipes.find((r) => r.id === id);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (recipeToEdit) {
      setRecipe(JSON.parse(JSON.stringify(recipeToEdit)));
    }
  }, [recipeToEdit]);

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    if (!recipe) return;
    const updated = [...recipe.ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setRecipe({ ...recipe, ingredients: updated });
  };

  const handleAddIngredient = () => {
    if (!recipe) return;
    const newIngredient: Ingredient = {
      id: crypto.randomUUID(),
      name: "",
      quantity: 0,
      unit: "",
    };
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, newIngredient],
    });
  };

  const handleRemoveIngredient = (index: number) => {
    if (!recipe) return;
    const updated = [...recipe.ingredients];
    updated.splice(index, 1);
    setRecipe({ ...recipe, ingredients: updated });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (recipe) {
      updateRecipe(recipe);
      navigate("/");
    }
  };

  if (!recipe) return <div className="p-8">Recipe not found.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Edit Recipe</h2>
      <form onSubmit={handleSave} className="space-y-4">

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Title</label>
          <input
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Category</label>
          <input
            type="text"
            value={recipe.category}
            onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Image Path or URL</label>
          <input
            type="text"
            value={recipe.image}
            onChange={(e) => setRecipe({ ...recipe, image: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* Times and Servings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Prep Time (min)</label>
            <input
              type="number"
              value={recipe.preparationTime}
              onChange={(e) =>
                setRecipe({ ...recipe, preparationTime: Number(e.target.value) })
              }
              className="border p-2 rounded"
              min={0}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Cook Time (min)</label>
            <input
              type="number"
              value={recipe.cookingTime}
              onChange={(e) =>
                setRecipe({ ...recipe, cookingTime: Number(e.target.value) })
              }
              className="border p-2 rounded"
              min={0}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">Servings</label>
            <input
              type="number"
              value={recipe.servings}
              onChange={(e) =>
                setRecipe({ ...recipe, servings: Number(e.target.value) })
              }
              className="border p-2 rounded"
              min={1}
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="font-semibold mb-2">Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={ingredient.id} className="grid grid-cols-3 gap-2 mb-2">
              <div className="flex flex-col">
                <label className="text-xs text-gray-500">Name</label>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  className="border p-2 rounded"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-500">Quantity</label>
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", Number(e.target.value))
                  }
                  className="border p-2 rounded"
                  min={0}
                />
              </div>
              <div className="flex gap-2 items-end">
                <div className="flex flex-col w-full">
                  <label className="text-xs text-gray-500">Unit</label>
                  <input
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    className="border p-2 rounded"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-600 hover:underline mb-1"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 text-blue-600 hover:underline"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Directions */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Directions</label>
          <textarea
            value={recipe.directions}
            onChange={(e) => setRecipe({ ...recipe, directions: e.target.value })}
            className="border p-2 rounded"
            rows={4}
          />
        </div>

        {/* Nutrition */}
        <h3 className="font-semibold mb-2">Nutritional Info (per serving)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {(["calories", "proteins", "fats", "carbs", "fiber"] as const).map((key) => (
            <div className="flex flex-col" key={key}>
              <label className="text-xs text-gray-500 capitalize">{key}</label>
              <input
                type="number"
                value={recipe.nutritionalInfo[key]}
                onChange={(e) =>
                  setRecipe({
                    ...recipe,
                    nutritionalInfo: {
                      ...recipe.nutritionalInfo,
                      [key]: Number(e.target.value),
                    },
                  })
                }
                className="border p-2 rounded"
                min={0}
              />
            </div>
          ))}
        </div>

        {/* Save */}
        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-gray-500 hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
