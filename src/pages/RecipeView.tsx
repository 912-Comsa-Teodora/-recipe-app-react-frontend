import { useParams, useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";


const RecipeView = () => {
  const { id } = useParams();
  const { recipes } = useRecipes();
  const recipe = recipes.find((r) => r.id === id);
  const navigate = useNavigate();

  if (!recipe) return <div className="p-8">Recipe not found.</div>;

  return (

    
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
        
      <div className="w-full max-w-2xl bg-white rounded shadow p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-2">{recipe.title}</h1>
        <p className="text-sm text-gray-500 mb-4">{recipe.category}</p>

        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>Prep: {recipe.preparationTime} min</div>
          <div>Cook: {recipe.cookingTime} min</div>
          <div>Servings: {recipe.servings}</div>
        </div>

        <h3 className="font-semibold mb-1">Ingredients</h3>
        <ul className="mb-6 list-disc list-inside text-sm">
          {recipe.ingredients.map((ing) => (
            <li key={ing.id}>
              {ing.quantity} {ing.unit} {ing.name}
            </li>
          ))}
        </ul>

        <h3 className="font-semibold mb-1">Directions</h3>
        <p className="mb-6 text-sm whitespace-pre-line">{recipe.directions}</p>

        {(recipe.nutritionalInfo.calories > 0 ||
          recipe.nutritionalInfo.proteins > 0 ||
          recipe.nutritionalInfo.fats > 0 ||
          recipe.nutritionalInfo.carbs > 0 ||
          recipe.nutritionalInfo.fiber > 0) && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Nutritional Info (per serving)</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>Calories: {recipe.nutritionalInfo.calories}g</li>
              <li>Proteins: {recipe.nutritionalInfo.proteins}g</li>
              <li>Fats: {recipe.nutritionalInfo.fats}g</li>
              <li>Carbs: {recipe.nutritionalInfo.carbs}g</li>
              <li>Fiber: {recipe.nutritionalInfo.fiber}g</li>
            </ul>
          </div>
        )}

        <button
          className="mt-6 text-blue-500 hover:underline"
          onClick={() => navigate("/")}
        >
          ← Back to recipes
        </button>
      </div>
    </div>
  );
};

export default RecipeView;
