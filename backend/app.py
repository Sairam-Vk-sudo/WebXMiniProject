import os
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from bson import ObjectId
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:*"])

bcrypt = Bcrypt(app)

# Database connection
MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("❌ MongoDB URI is missing in environment variables!")

client = MongoClient(MONGODB_URI)
db = client.get_database("webx_miniproject")

# Collections
users = db.get_collection("users")
recipes = db.get_collection("recipes")

# ➤ SIGN UP
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

    return jsonify({"message": "User created successfully."}), 201 if db_response.inserted_id else jsonify({"error": "Error creating user."}), 500

# ➤ LOGIN
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
                    "ratings": {},
                    "avg_rating": 0,
                    "num_ratings": 0,
                    "ingredients": ingredients,
                    "steps": steps,
                    "added_by": added_by
            }
    
    db_response = recipes.insert_one(new_recipe)
    
    if db_response.inserted_id:
        return jsonify({"message": "Recipe created successfully."}), 201
    else:
        return jsonify({"error": "There was an error creating the recipe."}), 500

# ➤ ADD RECIPE
@app.route("/recipes", methods=["POST", "GET"])
def recipes():
    if request.method == "POST":
        add_recipe()
    elif request.method == "GET":
        get_all_recipes()
    else:
        return jsonify({"error": "Method Not Allowed."}), 405

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

    new_recipe = {
        "name": name,
        "is_vegetarian": is_vegetarian,
        "rating": rating,
        "ingredients": ingredients,
        "steps": steps,
        "added_by": added_by
    }

    db_response = recipes.insert_one(new_recipe)

    return jsonify({"message": "Recipe created successfully.", "recipe_id": str(db_response.inserted_id)}), 201 if db_response.inserted_id else jsonify({"error": "Error creating recipe."}), 500

# ➤ GET ALL RECIPES
def get_all_recipes():
    try:
        recipe_list = list(recipes.find({}, {"_id": 1, "name": 1, "added_by": 1, "description": 1, "ingredients": 1, "image": 1, "rating": 1}))

        for recipe in recipe_list:
            recipe["_id"] = str(recipe["_id"])
            recipe["rating"] = recipe.get("rating", {"avg_rating": 0, "num_ratings": 0})

        return jsonify(recipe_list), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


# ➤ RATE A RECIPE
@app.route("/recipes/<recipe_id>/ratings", methods=["POST", "GET"])
def ratings(recipe_id):
    if request.method == "POST":
        rate_recipe(recipe_id)
    elif request.method == "GET":
        get_rating_data(recipe_id)
    else:
        return jsonify({"error": "Method Not Allowed."}), 405

def rate_recipe(recipe_id):
    req = request.json
    
    userid = req.get("userid")
    rating = req.get("rating")

    if rating is None or not (1 <= rating <= 5):
        return jsonify({"error": "Rating must be between 1 and 5."}), 400

    try:
        recipe = recipes.find_one({"_id": ObjectId(recipe_id)})
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        ratings = recipe.get("ratings", {})
        
        ratings[str(userid)] = rating
        
        num_ratings = len(ratings)
        avg_rating = round(ratings.values() / num_ratings)

        recipes.update_one(
            {"_id": ObjectId(recipe_id)},
            {
                "$set": {
                    "ratings": ratings,
                    "avg_rating": avg_rating,
                    "num_ratings": num_ratings
                }
            }
        )

        return jsonify({"message": "Rating updated successfully", "avg_rating": avg_rating, "num_ratings": num_ratings}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

def get_rating_data(recipe_id):
    try:
        recipe = recipes.find_one({"_id": ObjectId(recipe_id)})
        
        if not recipe:
            return jsonify({"error": "Recipe not found"}), 404

        return jsonify({"message": "Rating fetched successfully", "avg_rating": recipe.avg_rating, "num_ratings": recipe.num_ratings}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    

if __name__ == "__main__":
    app.run(debug=True)
