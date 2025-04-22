import { fetchRecipeDetails } from "@/lib/fetchData";
import { Ingredient, RecipeDetails } from "@/lib/types";
import { Metadata } from "@/node_modules/next/types";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Recipe Details',
};

export default async function RecipeDetailsPage({ 
  params, 
}: { 
  params: { recipeId: string }; 
}) {
  let recipeDetails: RecipeDetails | null = null;

  try {
    recipeDetails = await fetchRecipeDetails(params.recipeId);
  } catch (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Something went wrong while fetching recipes.
      </div>
    );
  }

  if (!recipeDetails) {
    return (
      <div className="p-6 text-center text-gray-500">
        No details available for this recipe.
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-green-100">
        <Suspense fallback={<p className="text-center text-gray-500">Loading recipe details...</p>}>
          <h1 className="text-3xl font-bold mb-6 text-black-700">{recipeDetails.title}</h1>
          
          <img 
            src={recipeDetails.image} 
            alt={recipeDetails.title} 
            className="w-full h-64 object-cover rounded-xl mb-6"
          />
          
          <div className="text-lg mb-6 text-black-800">
            <p><strong>Ready in:</strong> {recipeDetails.readyInMinutes} minutes</p>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-black-700">Ingredients:</h2>
          <ul className="list-disc pl-6 space-y-2">
            {recipeDetails.extendedIngredients.map((ingredient: Ingredient) => (
              <li key={ingredient.id} className="text-lg text-black-900">
                {ingredient.amount} {ingredient.unit} of {ingredient.name}
              </li>
            ))}
          </ul>
        </Suspense>
      </div>
    </main>
  )
}