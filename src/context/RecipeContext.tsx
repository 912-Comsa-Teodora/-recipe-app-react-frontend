import { createContext, useContext, useState, ReactNode } from "react";
import { Recipe } from "../types/Recipe";
import { mockRecipes } from "../services/mockData";

type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  updateRecipe: (updated: Recipe) => void;
  deleteRecipe: (id: string) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error("useRecipes must be used within RecipeProvider");
  return context;
};

export const RecipeProvider = ({ children }: { children: ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);

  const addRecipe = (recipe: Recipe) => {
    setRecipes((prev) => [...prev, recipe]);
  };

  const updateRecipe = (updated: Recipe) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === updated.id ? updated : r))
    );
  };

  const deleteRecipe = (id: string) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
