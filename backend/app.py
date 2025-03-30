import os
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_cors import CORS;

app = Flask(__name__)
CORS(app, origins=["http://localhost:*"])
bcrypt = Bcrypt(app)

load_dotenv()
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.get_database("webx_miniproject")

users = db.get_collection("users")
recipes = db.get_collection("recipes")

@app.route("/signup", methods=["POST"])
def sign_up():
    req = request.json
    
    username = req.get("username")
    email = req.get("email")
    password_plain = req.get("password")
    
    if users.find_one({"email": email}):
        return jsonify({"error": "A user is already registered with this email."}), 409
    
    if not username or not password_plain:
        return jsonify({"error": "All fields are required."}), 400 
    
    password_hash = bcrypt.generate_password_hash(password_plain).decode("utf-8")
    
    db_response = users.insert_one({"username": username, "email": email, "password": password_hash})
    
    if db_response.inserted_id:
        return jsonify({"message": "User created successfully."}), 201
    else:
        return jsonify({"error": "There was an error creating the user."}), 500

@app.route("/login", methods=["POST"])
def login():
    req = request.json
    
    email = req.get("email")
    password_plain = req.get("password")
    
    if not email or not password_plain:
        return jsonify({"error": "Email and Password are required."}), 400
    
    user = users.find_one({"email": email})
    
    if not user:
        return jsonify({"error": "Invalid email or password."}), 401
    
    if bcrypt.check_password_hash(user["password"], password_plain):
        return jsonify({
                        "message": "Login successful.", 
                        "userid": str(user["_id"])
                    }), 200
    else:
        return jsonify({"error": "Invalid email or password."}), 401

@app.route("/recipes", methods=["POST"])
def add_recipe():
    req = request.json
    
    name = req.get("name")
    is_vegetarian = req.get("is_vegetarian")
    rating = {"avg_rating": 0, "num_ratings": 0}
    ingredients = req.get("ingredients", [])
    steps = req.get("steps", [])
    added_by = req.get("added_by")
    
    if not name or not ingredients or not steps or not added_by or is_vegetarian is None:
        return jsonify({"error": "All fields are required."}), 400
    
    for i in ingredients:
        if not isinstance(i, dict):
            return jsonify({"error": "Invalid format for ingredients, need dictionary."}), 400
        
        if i.keys() != {"name", "amount"}:
            return jsonify({"error": "Ingredients should only have 'name' and 'amount' keys."}), 400
        
        if not isinstance(i["name"], str) or not isinstance(i["amount"], (str, int)):
            return jsonify({"error": "Both 'name' and 'amount' must be strings."}), 400
        
    new_recipe = {
                    "name": name,
                    "is_vegetarian": is_vegetarian,
                    "rating": rating,
                    "ingredients": ingredients,
                    "steps": steps,
                    "added_by": added_by
            }
    
    db_response = recipes.insert_one(new_recipe)
    
    if db_response.inserted_id:
        return jsonify({"message": "Recipe created successfully."}), 201
    else:
        return jsonify({"error": "There was an error creating the recipe."}), 500

if(__name__ == "__main__"): 
    app.run()