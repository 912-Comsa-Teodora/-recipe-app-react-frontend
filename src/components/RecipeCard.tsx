import { Recipe } from "../types/Recipe";
import { useNavigate } from "react-router-dom";

type Props = {
  recipe: Recipe;
  onDelete: (id: string) => void;
  calorieStats: { max: number; min: number; avg: number };
};

const RecipeCard = ({ recipe, onDelete,calorieStats }: Props) => {
  const navigate = useNavigate();

  const { calories } = recipe.nutritionalInfo;
let calColor = "";

if (calories === calorieStats.max) {
  calColor = "text-red-500 font-bold";
} else if (calories === calorieStats.min) {
  calColor = "text-green-600 font-bold";
} else if (Math.abs(calories - calorieStats.avg) <= 20) {
  calColor = "text-yellow-500 font-semibold";
}



  return (
    <div className="border rounded-lg p-4 shadow-md w-[300px] bg-white">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded"
      />
        <h2
        className="text-xl font-bold mt-2 cursor-pointer hover:underline"
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        >
        {recipe.title}
        </h2>
      <p className="text-gray-600">{recipe.category}</p>
      <p className="text-sm mt-1">
        Prep: {recipe.preparationTime} min | Cook: {recipe.cookingTime} min
      </p>
      <p className={`text-sm mt-1 ${calColor}`}>
        Calories: {calories}
        </p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => navigate(`/edit/${recipe.id}`)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(recipe.id)}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
