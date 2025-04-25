import React, { useState } from "react";

const RecipeCard = ({ recipe }) => {
    const [showFullRecipe, setShowFullRecipe] = useState(false);

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden w-80">
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{recipe.title}</h2>
                <p className="text-sm text-gray-600 mb-2">By: {recipe.user}</p>
                <p className="text-gray-700">{recipe.description}</p>
                <button className="mt-3 bg-amber-700 text-white py-1 px-3 rounded-md" onClick={() => setShowFullRecipe(!showFullRecipe)}>
                    {showFullRecipe ? "Hide Recipe" : "View Full Recipe"}
                </button>

                {showFullRecipe && (
                    <div className="mt-3">
                        <h3 className="text-lg font-bold text-gray-800">Steps:</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {recipe.steps.map((step, index) => (
                                <li key={index} className="text-sm">
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipeCard;
