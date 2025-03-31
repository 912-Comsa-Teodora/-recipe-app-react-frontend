import { useEffect, useState } from "react";
import { useRecipes } from "../context/RecipeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#FF8052", "#EF8342", "#FFBB38"];

// charts to display recipe statistics (calories, protein, cooking time)
interface CalorieData {
  name: string;
  calories: number;
}

interface ProteinData {
  name: string;
  protein: number;
}

interface CookingData {
  name: string;
  cookingTime: number;
}

const Statistics = () => {
  const { recipes } = useRecipes();

  // data for the charts
  const [calorieData, setCalorieData] = useState<CalorieData[]>([]);
  const [proteinData, setProteinData] = useState<ProteinData[]>([]);
  const [cookingData, setCookingData] = useState<CookingData[]>([]);

  // async data loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      const calories = recipes.map((r) => ({
        name: r.title,
        calories: r.nutritionalInfo.calories,
      }));

      const proteins = recipes.map((r) => ({
        name: r.title,
        protein: r.nutritionalInfo.proteins,
      }));

      const cooking = recipes.map((r) => ({
        name: r.title,
        cookingTime: r.cookingTime,
      }));

      setCalorieData(calories);
      setProteinData(proteins);
      setCookingData(cooking);
    }, 500); // simulate async delay

    return () => clearTimeout(timeout);
  }, [recipes]);

  return (
    <div className="bg-white p-6 rounded shadow mb-8">
      <h2 className="text-2xl font-bold mb-4">Recipe Statistics</h2>

      {/* Bar Chart - Calories */}
      <div className="mb-8 w-full h-64">
        <h3 className="text-lg font-semibold mb-2">Calories per Recipe</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={calorieData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="calories" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Protein Distribution */}
      <div className="mb-8 w-full h-64">
        <h3 className="text-lg font-semibold mb-2">Protein Distribution</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={proteinData}
              dataKey="protein"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#82ca9d"
              label
            >
              {proteinData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Cooking Time */}
      <div className="w-full h-64">
        <h3 className="text-lg font-semibold mb-2">Cooking Time per Recipe</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={cookingData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="cookingTime" stroke="#FF8042" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Statistics;
