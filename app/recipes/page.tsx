import { fetchRecipes } from "@/lib/fetchData";
import { Recipe } from "@/lib/types";
import Link from "@/node_modules/next/link";
import { Metadata } from "@/node_modules/next/types";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'Recipes',
};

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: {
    query?: string;
    cuisine?: string;
    maxReadyTime?: string;
  };
}) {
  let recipes: Recipe[] = [];

  try {
    recipes = await fetchRecipes(searchParams);
  } catch (error) {
    return (
      <div className="p-6 text-center text-red-600">
        Something went wrong while fetching recipes.
      </div>
    )
  }

  if (!recipes.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No recipes available. Try different filters.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-green-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black-700">Recipes</h1>

        <Suspense fallback={<p className="text-center text-gray-500">Loading recipes...</p>}>
          <div className="space-y-6">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-green-100 block"
              >
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover rounded-t-2xl"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-lg text-black-700">{recipe.title}</h2>
                </div>
              </Link>
            ))}
          </div>
        </Suspense>
      </div>
    </main>
  )
}