import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/recipes")
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setError("Failed to load recipes. Please try again later.");
      });
  }, []);

  return (
    <div className="min-h-screen bg-amber-50">
      <Navbar />
      <h1 className="text-3xl font-bold text-amber-700 text-center mb-6">All Recipes</h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      <div className="flex flex-wrap gap-6 justify-center">
        {recipes.length === 0 ? (
          <p className="text-gray-600">No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <div key={recipe._id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={recipe.image || "https://via.placeholder.com/150"} alt={recipe.name} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{recipe.name}</h2>
                <p className="text-sm text-gray-600">By {recipe.added_by}</p>
                <p className="text-gray-700 mt-2">{recipe.description || "No description available."}</p>

                {/* Display First 3 Ingredients */}
                <ul className="text-sm text-gray-800 mt-2">
                  {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                    <li key={index}>• {ingredient.name} ({ingredient.amount})</li>
                  ))}
                  {recipe.ingredients.length > 3 && <li>...and more</li>}
                </ul>

                <Link to={`/recipe/${recipe._id}`}>
                  <button className="mt-3 w-full bg-amber-700 text-white py-2 rounded-md font-bold hover:bg-amber-800">
                    View Full Recipe
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
