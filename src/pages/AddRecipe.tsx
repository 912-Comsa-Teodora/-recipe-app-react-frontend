import { useState } from "react";
import { Ingredient, Recipe } from "../types/Recipe";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

const AddRecipe = () => {
  const navigate = useNavigate();
  const { addRecipe } = useRecipes();

  const [recipe, setRecipe] = useState<Omit<Recipe, "id">>({
    title: "",
    category: "",
    image: "",
    preparationTime: 0,
    cookingTime: 0,
    servings: 1,
    ingredients: [],
    directions: "",
    nutritionalInfo: {
      calories: 0,
      proteins: 0,
      fats: 0,
      carbs: 0,
      fiber: 0,
    },
  });

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    const updated = [...recipe.ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setRecipe({ ...recipe, ingredients: updated });
  };

  const handleAddIngredient = () => {
    const newIngredient: Ingredient = {
      id: uuidv4(),
      name: "",
      quantity: 0,
      unit: "",
    };
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, newIngredient] });
  };

  const handleRemoveIngredient = (index: number) => {
    const updated = [...recipe.ingredients];
    updated.splice(index, 1);
    setRecipe({ ...recipe, ingredients: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRecipe({
      id: uuidv4(),
      ...recipe,
    });
    navigate("/");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Title */}
        <div className="flex flex-col">
        <label htmlFor="title" className="text-sm text-gray-600 mb-1">Title</label>          <input
            id="title"
            type="text"
            value={recipe.title}
            onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm text-gray-600 mb-1">Category</label>
          <input
            id="category"
            type="text"
            value={recipe.category}
            onChange={(e) => setRecipe({ ...recipe, category: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm text-gray-600 mb-1">Image Path or URL</label>
          <input
            id="image"
            type="text"
            value={recipe.image}
            onChange={(e) => setRecipe({ ...recipe, image: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        {/* Times + Servings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label htmlFor="preptime" className="text-sm text-gray-600 mb-1">Prep Time (min)</label>
            <input
                id="preptime"
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
            <label htmlFor="cooktime" className="text-sm text-gray-600 mb-1">Cook Time (min)</label>
            <input
                id="cooktime"
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
            <label htmlFor="servings" className="text-sm text-gray-600 mb-1">Servings</label>
            <input
                id="servings"
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
                <label htmlFor="nameingred" className="text-xs text-gray-500">Name</label>
                <input
                    id="nameingred"
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
                <label htmlFor="quantity" className="text-xs text-gray-500">Quantity</label>
                <input
                    id="quantity"
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
                  <label htmlFor="unit" className="text-xs text-gray-500">Unit</label>
                  <input
                    id="unit"
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

        {/* Nutritional Info */}
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

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 mt-4"
        >
          Save Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
