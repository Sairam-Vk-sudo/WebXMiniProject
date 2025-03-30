import React from "react";
import Navbar from "../components/Navbar";

const placeholderRecipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
    image: "https://source.unsplash.com/300x200/?pasta",
  },
  {
    id: 2,
    title: "Avocado Toast",
    description: "Crunchy toast topped with creamy avocado and a pinch of seasoning.",
    image: "https://source.unsplash.com/300x200/?avocado",
  },
  {
    id: 3,
    title: "Chocolate Cake",
    description: "Rich and moist chocolate cake topped with smooth frosting.",
    image: "https://source.unsplash.com/300x200/?cake",
  },
  {
    id: 4,
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
    image: "https://source.unsplash.com/300x200/?pasta",
  },
  
];

function RecipesPage() {
  return (
    <div className="bg-amber-50 min-h-screen">
      <Navbar />
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-8">Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {placeholderRecipes.map((recipe) => (
            <div key={recipe.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-amber-600">{recipe.title}</h3>
                <p className="text-gray-600 mt-2">{recipe.description}</p>
                <button className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecipesPage;
