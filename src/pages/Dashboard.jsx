import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold text-amber-700">Welcome to Your Dashboard!</h2>
        <p className="text-gray-700 mt-2">Manage your recipes, explore new dishes, and start cooking.</p>

        <div className="mt-6">
          <Link to="/recipes" className="bg-amber-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-amber-800">
            Explore Recipes
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
