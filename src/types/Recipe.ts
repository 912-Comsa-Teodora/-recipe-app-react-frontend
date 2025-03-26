export type Ingredient = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
  };
  
  export type Recipe = {
    id: string;
    title: string;
    category: string;
    image: string;
    preparationTime: number;
    cookingTime: number;
    servings: number;
    ingredients: Ingredient[];
    directions: string;
    nutritionalInfo: {
      calories: number;
      proteins: number;
      fats: number;
      carbs: number;
      fiber: number;
    };
  };
  