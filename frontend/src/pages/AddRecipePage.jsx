import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const AddRecipe = () => {
    const [recipe, setRecipe] = useState({
        name: "",
        is_vegetarian: false,
        ingredients: [{ name: "", amount: "" }],
        steps: [""],
        added_by: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Fetch user ID from localStorage on component load
    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (userID) {
            setRecipe((prevRecipe) => ({ ...prevRecipe, added_by: userID }));
        } else {
            alert("You must be logged in to add a recipe.");
        }
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRecipe({
            ...recipe,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Handle ingredient changes
    const handleIngredientChange = (index, e) => {
        const { name, value } = e.target;
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index][name] = value;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    // Handle step changes
    const handleStepChange = (index, e) => {
        const updatedSteps = [...recipe.steps];
        updatedSteps[index] = e.target.value;
        setRecipe({ ...recipe, steps: updatedSteps });
    };

    // Add new ingredient field
    const addIngredient = () => {
        setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, { name: "", amount: "" }],
        });
    };

    // Add new step field
    const addStep = () => {
        setRecipe({ ...recipe, steps: [...recipe.steps, ""] });
    };

    // Handle image upload
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

    // Submit the recipe to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://127.0.0.1:5000/recipes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipe),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Recipe added successfully!");
                setRecipe({
                    name: "",
                    is_vegetarian: false,
                    ingredients: [{ name: "", amount: "" }],
                    steps: [""],
                    added_by: localStorage.getItem("username"),
                    image: "",
                });
            } else {
                setMessage(data.error);
            }
        } catch (error) {
            console.error("Error adding recipe:", error);
            setMessage("Error adding recipe. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar />
            <div className="p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-8">
                <h2 className="text-2xl font-bold text-amber-800 text-center mb-4">Add Your Recipe</h2>

                {message && <p className="text-center text-red-600">{message}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-900">Recipe Name</label>
                        <input type="text" name="name" value={recipe.name} onChange={handleChange} placeholder="Enter recipe name" className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900" required />
                    </div>

                    {/* Ingredients Section */}
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-900">Ingredients</label>
                        {recipe.ingredients.map((ingredient, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input type="text" name="name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, e)} placeholder="Ingredient Name" className="w-1/2 p-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900" required />
                                <input type="text" name="amount" value={ingredient.amount} onChange={(e) => handleIngredientChange(index, e)} placeholder="Amount" className="w-1/2 p-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900" required />
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient} className="text-blue-500">
                            + Add Ingredient
                        </button>
                    </div>

                    {/* Steps Section */}
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-900">Steps</label>
                        {recipe.steps.map((step, index) => (
                            <textarea key={index} value={step} onChange={(e) => handleStepChange(index, e)} placeholder={`Step ${index + 1}`} className="w-full p-2 border border-gray-400 rounded-md bg-gray-100 text-gray-900 mb-2" required />
                        ))}
                        <button type="button" onClick={addStep} className="text-blue-500">
                            + Add Step
                        </button>
                    </div>

                    {/* Is Vegetarian Checkbox */}
                    <div className="mb-4">
                        <label className="flex items-center font-semibold text-gray-900">
                            <input type="checkbox" name="is_vegetarian" checked={recipe.is_vegetarian} onChange={handleChange} className="mr-2" />
                            Vegetarian
                        </label>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block font-semibold text-gray-900">Upload Image</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 border border-gray-400 rounded-md bg-gray-100" />
                    </div>

                    <button type="submit" className="w-full bg-amber-800 text-white p-2 rounded-md font-bold hover:bg-amber-900" disabled={loading}>
                        {loading ? "Adding..." : "Add Recipe"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipe;
