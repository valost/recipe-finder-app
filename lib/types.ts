export type Recipe = {
  id: number;
  title: string;
  image: string;
}

export type Ingredient = {
  id: number;
  name: string;
  image: string;
  amount: number;
  unit: string;
};

export type RecipeDetails = {
  id: number;
  image: string;
  title: string;
  readyInMinutes: number;
  extendedIngredients: Ingredient[];
};
