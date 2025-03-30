import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Navigation Hook

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-amber-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-amber-700 text-center mb-4">Culinary Corner</h1>
        <p className="text-center text-gray-700 mb-6">Your personal recipe collection</p>

        <div className="flex justify-center gap-4 mb-6 text-2xl">
          <span>🍅</span>
          <span>🥑</span>
          <span>🍋</span>
        </div>

        <div className="flex mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 p-2 border-b-2 ${isLogin ? "border-amber-700 font-bold text-amber-700" : "text-gray-700"}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 p-2 border-b-2 ${!isLogin ? "border-amber-700 font-bold text-amber-700" : "text-gray-700"}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input type="email" placeholder="chef@example.com" className="w-full p-2 border border-gray-400 rounded-md text-gray-800" required />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input type="password" placeholder="********" className="w-full p-2 border border-gray-400 rounded-md text-gray-800" required />
          </div>

          <button type="submit" className="w-full bg-amber-700 text-white p-2 rounded-md font-bold mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
