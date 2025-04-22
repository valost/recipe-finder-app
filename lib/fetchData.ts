import { API_KEY } from "./config"
import { Recipe } from "./types";

const apiKey = API_KEY as string;

export async function fetchRecipes(searchParams: {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}): Promise<Recipe[]> {
  const { query, cuisine, maxReadyTime } = searchParams;

  const url = new URL('https://api.spoonacular.com/recipes/complexSearch');

  if (query) {
    url.searchParams.append('query', query);
  }

  if (cuisine) {
    url.searchParams.append('cuisine', cuisine);
  }

  if (maxReadyTime) {
    url.searchParams.append('maxReadyTime', maxReadyTime);
  }

  url.searchParams.append('apiKey', apiKey);

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

export async function fetchRecipeDetails(recipeId: string) {
  try {
    const url = new URL(`https://api.spoonacular.com/recipes/${recipeId}/information`);

    url.searchParams.append('apiKey', apiKey);

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details');
    }

    const data = await response.json();

    const recipeDetails = {
      id: data.id,
      title: data.title,
      image: data.image,
      readyInMinutes: data.readyInMinutes,
      extendedIngredients: data.extendedIngredients.map((ingredient: any) => ({
        id: ingredient.id,
        name: ingredient.name,
        image: ingredient.image,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
    };

    return recipeDetails;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
}