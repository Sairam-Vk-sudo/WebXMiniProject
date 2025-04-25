import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

    // Fetch recipes from the backend
    const fetchRecipes = (query = "") => {
        setLoading(true);
        axios
            .get(`http://localhost:5000/recipes${query ? `?search=${query}` : ""}`)
            .then((response) => {
                setRecipes(response.data);
                setError("");
            })
            .catch((error) => {
                console.error("Error fetching recipes:", error);
                setError("Failed to load recipes. Please try again later.");
                setRecipes([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Fetch all recipes on component mount
    useEffect(() => {
        fetchRecipes();
    }, []);

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Fetch filtered recipes when searchQuery changes (debounced)
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchRecipes(searchQuery);
        }, 500); // 500ms debounce

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar />
            <h1 className="text-3xl font-bold text-amber-700 text-center mt-4">All Recipes</h1>

            {/* Search Bar */}
            <div className="flex justify-center mt-4">
                <input type="text" placeholder="Search for recipes..." value={searchQuery} onChange={handleSearchChange} className="w-2/3 md:w-1/3 p-2 border-2 border-amber-700 bg-white text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-700 shadow-md" />
            </div>

            {/* Error message */}
            {error && <p className="text-center text-red-600 mt-4">{error}</p>}

            {/* Loading indicator */}
            {loading && <p className="text-center text-gray-600 mt-4">Loading recipes...</p>}

            {/* Recipes List */}
            <div className="flex flex-wrap gap-6 justify-center mt-6">
                {recipes.length === 0 && !loading ? (
                    <p className="text-gray-600">No recipes found.</p>
                ) : (
                    recipes.map((recipe) => (
                        <div key={recipe._id} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
                            <img src={recipe.image || "https://via.placeholder.com/150"} alt={recipe.name} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold text-gray-800">{recipe.name}</h2>
                                <p className="text-sm text-gray-600">By {recipe.added_by || "Unknown"}</p>
                                <p className="text-gray-700 mt-2">{recipe.description || "No description available."}</p>

                                {/* Display First 3 Ingredients */}
                                <ul className="text-sm text-gray-800 mt-2">
                                    {recipe.ingredients?.slice(0, 3).map((ingredient, index) => (
                                        <li key={index}>
                                            • {ingredient.name} ({ingredient.amount})
                                        </li>
                                    ))}
                                    {recipe.ingredients?.length > 3 && <li>...and more</li>}
                                </ul>

                                <Link to={`/recipes/${recipe._id}`}>
                                    <button className="mt-3 w-full bg-amber-700 text-white py-2 rounded-md font-bold hover:bg-amber-800">View Full Recipe</button>
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
