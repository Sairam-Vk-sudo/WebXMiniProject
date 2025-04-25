import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://127.0.0.1:5000"; // Flask Backend URL

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState(""); // Only for Sign Up
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Function to switch between Login & Sign Up
    const toggleMode = (mode) => {
        setIsLogin(mode);
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message

        try {
            if (isLogin) {
                // **Login API Call**
                const response = await axios.post(`${API_URL}/login`, {
                    email,
                    password,
                });

                if (response.data.userid) {
                    // ✅ Store user ID & username
                    localStorage.setItem("userID", response.data.userid); // Fixed key name
                    localStorage.setItem("username", response.data.username);

                    alert("Login Successful!");
                    navigate("/dashboard"); // Redirect after successful login
                } else {
                    setError("Invalid credentials. Please try again.");
                }
            } else {
                // **Sign Up API Call**
                if (password !== confirmPassword) {
                    setError("Passwords do not match!");
                    return;
                }

                await axios.post(`${API_URL}/signup`, {
                    username,
                    email,
                    password,
                });

                alert("Sign Up Successful. Please log in.");
                toggleMode(true); // Switch to login mode
            }
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        }
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

                {/* Toggle Between Login & Sign Up */}
                <div className="flex mb-6">
                    <button onClick={() => toggleMode(true)} className={`flex-1 p-2 border-b-2 ${isLogin ? "border-amber-700 font-bold text-amber-700" : "text-gray-700"}`}>
                        Login
                    </button>
                    <button onClick={() => toggleMode(false)} className={`flex-1 p-2 border-b-2 ${!isLogin ? "border-amber-700 font-bold text-amber-700" : "text-gray-700"}`}>
                        Sign Up
                    </button>
                </div>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Username Field (Only for Sign Up) */}
                    {!isLogin && (
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold text-gray-700">Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Chef123" className="w-full p-2 border border-gray-400 rounded-md text-gray-800" required />
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold text-gray-700">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="chef@example.com" className="w-full p-2 border border-gray-400 rounded-md text-gray-800" required />
                    </div>

                    {/* Password Field with Show/Hide */}
                    <div className="mb-4 relative">
                        <label className="block mb-1 font-semibold text-gray-700">Password</label>
                        <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="********" className="w-full p-2 border border-gray-400 rounded-md text-gray-800 pr-10" required />
                        <span className="absolute top-9 right-3 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    {/* Confirm Password Field (Only for Sign Up) */}
                    {!isLogin && (
                        <div className="mb-4 relative">
                            <label className="block mb-1 font-semibold text-gray-700">Confirm Password</label>
                            <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="********" className="w-full p-2 border border-gray-400 rounded-md text-gray-800 pr-10" required />
                            <span className="absolute top-9 right-3 cursor-pointer text-gray-600" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button type="submit" className="w-full bg-amber-700 text-white p-2 rounded-md font-bold mb-4">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AuthPage;
