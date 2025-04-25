import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedRating, setSelectedRating] = useState(null); // To track user-selected rating

    useEffect(() => {
        console.log("Fetching recipe with ID:", id);
        setLoading(true);

        axios
            .get(`http://localhost:5000/recipes/${id}`)
            .then((response) => {
                console.log("Recipe data received:", response.data);
                setRecipe(response.data);
                setError("");
            })
            .catch((error) => {
                console.error("Error fetching recipe:", error);
                setError("Failed to load recipe. Please check the ID.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    // Handle rating submission
    const handleRateRecipe = (rating) => {
        setSelectedRating(rating); // Show selected rating instantly

        axios
            .post(`http://localhost:5000/recipes/${id}/ratings`, { userid: localStorage.getItem("userID"), rating: rating })
            .then((response) => {
                console.log("Rating submitted:", response.data);
                setRecipe((prevRecipe) => ({
                    ...prevRecipe,
                    rating: {
                        avg_rating: response.data.avg_rating,
                        num_ratings: response.data.num_ratings,
                    },
                }));
            })
            .catch((error) => {
                console.error("Error rating recipe:", error);
                setError("Failed to submit rating.");
            });
    };

    if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
    if (error) return <div className="text-center text-red-600 text-xl mt-10">{error}</div>;

    return (
        <div className="min-h-screen bg-amber-50 p-6">
            <Navbar />
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={recipe.image || "https://via.placeholder.com/300"} alt={recipe.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800">{recipe.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">By {recipe.added_by || "Unknown"}</p>
                    <p className="text-gray-700 mb-6">{recipe.description || "No description available."}</p>

                    {/* Rating Section */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-amber-700">Rating</h2>
                        <p className="text-lg text-gray-800">
                            ⭐ {recipe.rating?.avg_rating?.toFixed(1)} ({recipe.rating?.num_ratings} votes)
                        </p>

                        {/* Rating Buttons */}
                        <div className="flex gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => handleRateRecipe(star)} className={`px-3 py-1 text-white text-sm rounded-lg ${selectedRating === star ? "bg-yellow-600" : "bg-yellow-400 hover:bg-yellow-500"}`}>
                                    {star} ⭐
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Ingredients Section */}
                    <h2 className="text-2xl font-semibold text-amber-700 mb-3">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-800 space-y-1 mb-6">
                        {recipe.ingredients?.length > 0 ? (
                            recipe.ingredients.map((ingredient, index) => (
                                <li key={index} className="pl-2">
                                    {ingredient.name} ({ingredient.amount})
                                </li>
                            ))
                        ) : (
                            <li>No ingredients available</li>
                        )}
                    </ul>

                    {/* Steps Section */}
                    <h2 className="text-2xl font-semibold text-amber-700 mb-3">Steps to Prepare</h2>
                    <ol className="list-decimal list-inside text-gray-800 space-y-2">
                        {recipe.steps?.length > 0 ? (
                            recipe.steps.map((step, index) => (
                                <li key={index} className="border-l-4 border-amber-700 pl-3">
                                    {step}
                                </li>
                            ))
                        ) : (
                            <li>No steps available</li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;
