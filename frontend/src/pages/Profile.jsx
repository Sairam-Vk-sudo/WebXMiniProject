import React from "react";
import Navbar from "../components/Navbar";
import { FaUserAlt, FaBookOpen } from "react-icons/fa";

const userInfo = {
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    joinedDate: "April 22, 2021",
    bio: "Food lover & recipe creator. Passionate about baking and trying new flavors!",
    profilePic: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
};

// User's cookbook recipes
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
    {
        id: 3,
        title: "Chocolate Pancakes",
        description: "Fluffy chocolate pancakes topped with syrup and fresh berries.",
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    },
];

function Profile() {
    return (
        <div className="min-h-screen bg-amber-50">
            {/* Navbar */}
            <Navbar />

            <div className="container mx-auto py-16 px-6 flex flex-col items-center">
                {/* User Information Section */}
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl relative mt-16">
                    {/* Profile Picture - Centered at the Top */}
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-amber-500 absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <img src={userInfo.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    </div>

                    {/* User Details - Left Aligned */}
                    <div className="mt-20 pl-6">
                        <h2 className="text-3xl font-bold text-amber-700 flex items-center gap-2">
                            <FaUserAlt className="text-amber-600" /> {userInfo.name}
                        </h2>
                        <p className="text-gray-600 mt-4">📧 {userInfo.email}</p>
                        <p className="text-gray-600 mt-3">📅 Joined on {userInfo.joinedDate}</p>
                        <p className="mt-6 text-gray-700 italic">{userInfo.bio}</p>
                    </div>
                </div>

                {/* Your Cookbook Section */}
                <section className="w-full mt-16">
                    <h3 className="text-2xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                        <FaBookOpen className="text-amber-600" /> Your Cookbook
                    </h3>
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
            </div>
        </div>
    );
}

export default Profile;
