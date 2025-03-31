import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import { Recipe, Ingredient } from "../types/Recipe";
import { v4 as uuidv4 } from "uuid";

const AddRecipe = () => {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    image: "",
    preparationTime: 0,
    cookingTime: 0,
    servings: 1,
    ingredients: [{ id: uuidv4(), name: "", quantity: 0, unit: "" }],
    directions: "",
    nutritionalInfo: {
      calories: 0,
      proteins: 0,
      fats: 0,
      carbs: 0,
      fiber: 0,
    },
  });

  const [error, setError] = useState("");

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: any
  ) => {
    const newIngredients = [...form.ingredients];
    newIngredients[index][field] = value as never;
    setForm({ ...form, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setForm({
      ...form,
      ingredients: [
        ...form.ingredients,
        { id: uuidv4(), name: "", quantity: 0, unit: "" },
      ],
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = form.ingredients.filter((_, i) => i !== index);
    setForm({ ...form, ingredients: newIngredients });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.category.trim() || !form.directions.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (
      form.preparationTime <= 0 ||
      form.cookingTime <= 0 ||
      form.servings <= 0
    ) {
      setError("Preparation, cooking time, and servings must be greater than 0.");
      return;
    }

    const firstIngredient = form.ingredients[0];
    if (
      form.ingredients.length === 0 ||
      !firstIngredient.name.trim() ||
      firstIngredient.quantity <= 0 ||
      !firstIngredient.unit.trim()
    ) {
      setError("At least one valid ingredient is required.");
      return;
    }

    const newRecipe: Recipe = {
      id: uuidv4(),
      title: form.title,
      category: form.category,
      image: form.image,
      preparationTime: form.preparationTime,
      cookingTime: form.cookingTime,
      servings: form.servings,
      ingredients: form.ingredients,
      directions: form.directions,
      nutritionalInfo: form.nutritionalInfo,
    };

    addRecipe(newRecipe);
    navigate("/");
  };

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Recipe</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Basic Inputs */}
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm text-gray-600 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="border p-2 rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm text-gray-600 mb-1">
            Category
          </label>
          <input
            id="category"
            type="text"
            className="border p-2 rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm text-gray-600 mb-1">
            Image Path or URL
          </label>
          <input
            id="image"
            type="text"
            className="border p-2 rounded"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />
        </div>

        {/* Time & Servings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <label htmlFor="prep" className="text-sm text-gray-600 mb-1">
              Preparation Time
            </label>
            <input
              id="prep"
              type="number"
              min={0}
              className="border p-2 rounded"
              value={form.preparationTime}
              onChange={(e) =>
                setForm({ ...form, preparationTime: parseInt(e.target.value) || 0 })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="cook" className="text-sm text-gray-600 mb-1">
              Cooking Time
            </label>
            <input
              id="cook"
              type="number"
              min={0}
              className="border p-2 rounded"
              value={form.cookingTime}
              onChange={(e) =>
                setForm({ ...form, cookingTime: parseInt(e.target.value) || 0 })
              }
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="serving" className="text-sm text-gray-600 mb-1">
              Servings
            </label>
            <input
              id="serving"
              type="number"
              min={1}
              className="border p-2 rounded"
              value={form.servings}
              onChange={(e) =>
                setForm({ ...form, servings: parseInt(e.target.value) || 0 })
              }
            />
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <h3 className="font-semibold mb-2">Ingredients</h3>
          {form.ingredients.map((ing, index) => (
            <div key={ing.id} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="text"
                placeholder="Ingredient name"
                className="border p-2 rounded"
                value={ing.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                className="border p-2 rounded"
                value={ing.quantity}
                onChange={(e) =>
                  handleIngredientChange(
                    index,
                    "quantity",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
              <input
                type="text"
                placeholder="Unit"
                className="border p-2 rounded"
                value={ing.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
              />
              {form.ingredients.length > 1 && (
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={() => removeIngredient(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 mt-2"
            onClick={addIngredient}
          >
            + Add Ingredient
          </button>
        </div>

        {/* Directions */}
        <div className="flex flex-col">
          <label htmlFor="directions" className="text-sm text-gray-600 mb-1">
            Directions
          </label>
          <textarea
            id="directions"
            className="border p-2 rounded"
            rows={4}
            value={form.directions}
            onChange={(e) => setForm({ ...form, directions: e.target.value })}
            required
          />
        </div>

        {/* Nutritional Info */}
        <h3 className="font-semibold mb-2">Nutritional Info (per serving)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries(form.nutritionalInfo).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-xs text-gray-500 capitalize">{key}</label>
              <input
                type="number"
                className="border p-2 rounded"
                min={0}
                value={value}
                onChange={(e) =>
                  setForm({
                    ...form,
                    nutritionalInfo: {
                      ...form.nutritionalInfo,
                      [key]: parseFloat(e.target.value) || 0,
                    },
                  })
                }
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 mt-4"
        >
          Save Recipe
        </button>
      </form>

      <button
        className="mt-6 text-blue-500 hover:underline"
        onClick={() => navigate("/")}
      >
        ← Back to recipes
      </button>
    </div>
  );
};

export default AddRecipe;
