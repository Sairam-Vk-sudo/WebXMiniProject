import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="bg-amber-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Culinary Corner</h1>
                <div className="space-x-6">
                    <Link to="/dashboard" className="hover:underline">
                        Dashboard
                    </Link>
                    <Link to="/recipes" className="hover:underline">
                        Recipes
                    </Link>
                    <Link to="/addrecipe" className="hover:underline">
                        Add Recipes
                    </Link>
                    <Link to="/profile" className="hover:underline">
                        Profile
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
