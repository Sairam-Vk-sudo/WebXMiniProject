import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function AddRecipe() {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const [recipes, setRecipes] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setRecipe({ ...recipe, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipe.name && recipe.ingredients && recipe.instructions) {
      setRecipes([...recipes, recipe]);
      setRecipe({ name: "", ingredients: "", instructions: "", image: "" });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navbar */}
      <Navbar />

      {/* Add Recipe Form */}
      <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold text-amber-800 text-center mb-4">Add Your Recipe</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold text-gray-900">Recipe Name</label>
            <input
              type="text"
              name="name"
              value={recipe.name}
              onChange={handleChange}
              placeholder="Enter recipe name"
              className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-900">Ingredients</label>
            <textarea
              name="ingredients"
              value={recipe.ingredients}
              onChange={handleChange}
              placeholder="List ingredients..."
              className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-900">Instructions</label>
            <textarea
              name="instructions"
              value={recipe.instructions}
              onChange={handleChange}
              placeholder="Describe how to prepare the dish..."
              className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-900">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-gray-400 rounded-md bg-gray-100" />
          </div>

          <button type="submit" className="w-full bg-amber-800 text-white p-2 rounded-md font-bold hover:bg-amber-900">
            Add Recipe
          </button>
        </form>
      </div>

      {/* Recipe Preview */}
      {recipes.length > 0 && (
        <div className="mt-8 p-8 max-w-3xl mx-auto bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-amber-800 text-center mb-4">Your Added Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4 shadow-md bg-amber-100">
                {rec.image && <img src={rec.image} alt={rec.name} className="w-full h-40 object-cover rounded-md mb-3" />}
                <h3 className="text-xl font-semibold text-amber-800">{rec.name}</h3>
                <p className="text-gray-900"><strong>Ingredients:</strong> {rec.ingredients}</p>
                <p className="text-gray-900"><strong>Instructions:</strong> {rec.instructions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRecipe;
