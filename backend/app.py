import os
from bson import Binary
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from bson.objectid import ObjectId
from dotenv import load_dotenv
from werkzeug.utils import secure_filename

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 10 * 1024 * 1024
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

    if db_response.inserted_id:
        return jsonify({"message": "User created successfully."}), 201
    else:
        return jsonify({"error": "Error creating user."}), 500


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

@app.route("/recipes", methods=["POST", "GET"])
def recipes_route():
    if request.method == "POST":
        return add_recipe()
    elif request.method == "GET":
        return get_recipes()
    else:
        return jsonify({"error": "Method Not Allowed."}), 405

def add_recipe():
    req = request.form
    req_files = request.files
    
    name = req.get("name")
    is_vegetarian = req.get("is_vegetarian")
    rating = {"avg_rating": 0, "num_ratings": 0}
    ingredients = req.get("ingredients", [])
    steps = req.get("steps", [])
    added_by = req.get("added_by", {})
    image = req_files.get("image")
    
    if not image:
        return jsonify({"error": "No image provided."}), 400
    elif image.content_length > 10 * 1024 * 1024:
        return jsonify({"error": "Image exceeds the 10 MB size limit."}), 400

    added_by_id = added_by.get("user_id")
    added_by_data = users.find_one({"_id": ObjectId(added_by_id)}, {"username": 1})
    
    if not added_by_data:
        return jsonify({"error": "User could not be found."}), 404
    
    added_by_name = added_by_data["username"]
    
    if not name or not ingredients or not steps or not added_by or not added_by_id or not added_by_name or is_vegetarian is None:
        return jsonify({"error": "All fields are required."}), 400
    
    image_name = secure_filename(name)
    image_bin = Binary(image.read())

    new_recipe = {
        "name": name,
        "is_vegetarian": is_vegetarian,
        "rating": rating,
        "ingredients": ingredients,
        "steps": steps,
        "added_by": {"user_id": str(added_by_id), "user_name": added_by_name},
        "image_data":{"name": image_name, "data": image_bin}
    }

    db_response = recipes.insert_one(new_recipe)

    if db_response.inserted_id:
        return jsonify({"message": "Recipe created successfully.", "recipe_id": str(db_response.inserted_id)}), 201
    else: 
        return jsonify({"error": "Error creating recipe."}), 500

def get_recipes():
    added_by = request.args.get("added_by")
    search_query = request.args.get("search") 

    query = {}

    if added_by:
        query["added_by.user_name"] = added_by

    if search_query:
        query["name"] = {"$regex": search_query, "$options": "i"}

    try:
        recipe_list = list(recipes.find(query, {"_id": 1, "name": 1, "ingredients": 1, "rating": 1, "added_by": 1, "image_data": 1}))

        for recipe in recipe_list:
            recipe["_id"] = str(recipe["_id"])
            recipe["rating"] = recipe.get("rating", {"avg_rating": 0, "num_ratings": 0})

        if recipe_list:  
            return jsonify(recipe_list), 200  
        else:
            return jsonify({"message": "No recipes found"}), 404

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

@app.route("/recipes/<recipe_id>", methods=["GET"])
def get_by_id(recipe_id):
    id_obj = ObjectId(recipe_id)
    recipe = recipes.find_one({"_id": id_obj})
    recipe["_id"] = str(recipe["_id"])

    if recipe:
        return jsonify(recipe), 200
    else:
        return jsonify({"error": "recipe not found."}), 404

# ➤ RATE A RECIPE
@app.route("/recipes/<recipe_id>/ratings", methods=["POST", "GET"])
def ratings(recipe_id):
    if request.method == "POST":
        return rate_recipe(recipe_id)
    elif request.method == "GET":
        return get_rating_data(recipe_id)
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
        avg_rating = round(sum(ratings.values()) / num_ratings)

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

        return jsonify({"message": "Rating fetched successfully", "avg_rating": recipe.get("avg_rating"), "num_ratings": recipe.get("num_ratings")}), 200

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
    

if __name__ == "__main__":
    app.run(debug=True)
