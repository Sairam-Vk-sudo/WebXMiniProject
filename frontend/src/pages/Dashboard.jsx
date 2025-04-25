import React from "react";
import Navbar from "../components/Navbar";
import { FaUtensils } from "react-icons/fa";

const popularRecipes = [
    {
        id: 1,
        title: "Spaghetti Carbonara",
        description: "A classic Italian pasta dish with eggs, cheese, pancetta, and pepper.",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    },
    {
        id: 2,
        title: "Avocado Toast",
        description: "Crunchy toast topped with creamy avocado and a pinch of seasoning.",
        image: "https://images.unsplash.com/photo-1565557623262-2181b05a3220",
    },
    {
        id: 3,
        title: "Chocolate Cake",
        description: "Rich and moist chocolate cake topped with smooth frosting.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
    },
];

const userRecipes = [
    {
        id: 1,
        title: "Homemade Pizza",
        description: "Delicious homemade pizza with fresh toppings and mozzarella cheese.",
        image: "https://images.unsplash.com/photo-1548365328-8499946d7131",
    },
    {
        id: 2,
        title: "Berry Smoothie",
        description: "A refreshing blend of mixed berries, yogurt, and honey.",
        image: "https://images.unsplash.com/photo-1514997130073-20748f94ee52",
    },
];

const quickMeals = [
    {
        id: 1,
        title: "Omelette",
        time: "10 min",
        image: "https://images.unsplash.com/photo-1572441712234-0226c774b847",
    },
    {
        id: 2,
        title: "Grilled Cheese",
        time: "15 min",
        image: "https://images.unsplash.com/photo-1604382354936-07b72f0d2105",
    },
];

const featuredChefs = [
    {
        id: 1,
        name: "Gordon Ramsay",
        specialty: "Fine Dining & French Cuisine",
        image: "https://images.unsplash.com/photo-1559628233-7ebf8e35f392",
    },
    {
        id: 2,
        name: "Jamie Oliver",
        specialty: "Healthy & Italian Cuisine",
        image: "https://images.unsplash.com/photo-1598879357289-50095e7a5eb3",
    },
];

function Dashboard() {
    return (
        <div className="min-h-screen bg-amber-50">
            <Navbar />

            <div className="container mx-auto py-12 px-6">
                {/* Welcome Section */}
                <div className="text-center mb-12 bg-gradient-to-r from-amber-300 to-amber-100 py-6 rounded-lg shadow-md">
                    <h1 className="text-4xl font-extrabold text-amber-700 flex items-center justify-center gap-3">
                        <FaUtensils className="text-amber-600" /> Welcome to Your Dashboard!
                    </h1>
                    <p className="text-lg text-gray-700 mt-2">Manage your recipes, explore new dishes, and start cooking.</p>
                </div>

                {/* Popular Recipes */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold text-amber-700 mb-4">Popular Recipes</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {popularRecipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
                                <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover" />
                                <div className="p-5">
                                    <h4 className="text-lg font-semibold text-amber-600">{recipe.title}</h4>
                                    <p className="text-gray-600 mt-2">{recipe.description}</p>
                                    <button className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition">View Recipe</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Your Cookbook */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold text-amber-700 mb-4">Your Cookbook</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userRecipes.map((recipe) => (
                            <div key={recipe.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition">
                                <img src={recipe.image} alt={recipe.title} className="w-full h-56 object-cover" />
                                <div className="p-5">
                                    <h4 className="text-lg font-semibold text-amber-600">{recipe.title}</h4>
                                    <p className="text-gray-600 mt-2">{recipe.description}</p>
                                    <button className="mt-4 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition">View Recipe</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Quick Meal Ideas */}
                <section className="mb-12">
                    <h3 className="text-2xl font-semibold text-amber-700 mb-4">Quick Meal Ideas</h3>
                    <div className="flex gap-6">
                        {quickMeals.map((meal) => (
                            <div key={meal.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition w-1/3">
                                <img src={meal.image} alt={meal.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h4 className="text-lg font-semibold text-amber-600">{meal.title}</h4>
                                    <p className="text-gray-600">Ready in {meal.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Chefs - Moved to Bottom */}
                <section className="mt-12">
                    <h3 className="text-2xl font-semibold text-amber-700 mb-4">Featured Chefs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {featuredChefs.map((chef) => (
                            <div key={chef.id} className="bg-white shadow-lg rounded-lg overflow-hidden flex items-center p-5 hover:shadow-2xl transition">
                                <img src={chef.image} alt={chef.name} className="w-20 h-20 rounded-full mr-4 object-cover" />
                                <div>
                                    <h4 className="text-lg font-semibold text-amber-600">{chef.name}</h4>
                                    <p className="text-gray-600">{chef.specialty}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
