import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-amber-50 text-gray-800">
      {/* Hero Section */}
      <header className="text-center py-16 bg-amber-100 shadow-md">
        <h1 className="text-5xl font-extrabold text-amber-700">Culinary Corner</h1>
        <p className="mt-3 text-lg text-gray-600">Your ultimate recipe collection and food inspiration hub</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-amber-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-amber-700 transition"
        >
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-4xl font-bold text-amber-700">Why Choose Culinary Corner?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Personalized Recipes", desc: "Get recommendations based on your taste." },
            { title: "Easy Sharing", desc: "Share your favorite dishes with friends & family." },
            { title: "Meal Planning", desc: "Plan your meals effortlessly." },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-amber-600">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16 px-8 text-center">
        <h2 className="text-4xl font-bold text-amber-700">What Our Users Say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { quote: "This app has transformed my cooking experience! Love it!", name: "Alex J." },
            { quote: "I’ve discovered so many new dishes. Highly recommend!", name: "Sarah M." },
          ].map((testimonial, index) => (
            <div key={index} className="p-6 bg-amber-100 rounded-lg shadow-md">
              <p className="text-gray-700">"{testimonial.quote}"</p>
              <h4 className="mt-4 font-semibold">- {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-4xl font-bold text-amber-700">How It Works</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "1. Sign Up", desc: "Create your free account in seconds." },
            { step: "2. Explore Recipes", desc: "Discover and save your favorite meals." },
            { step: "3. Cook & Enjoy", desc: "Follow simple steps and start cooking." },
          ].map((item, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-amber-600">{item.step}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center py-16 bg-amber-600 text-white">
        <h2 className="text-4xl font-bold">Join Culinary Corner Today!</h2>
        <p className="mt-2 text-lg">Start your cooking journey with us.</p>
        <button
          onClick={() => navigate("/login")}
          className="mt-6 bg-white text-amber-600 px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </section>

      {/* Footer Section */}
      <footer className="text-center py-6 bg-amber-800 text-white">
        <p>&copy; 2025 Culinary Corner. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-2">
          {["Privacy Policy", "Terms of Service", "Contact"].map((link, index) => (
            <a key={index} href="#" className="hover:underline">
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
