import os
from flask import Flask, jsonify, request
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv

app = Flask(__name__)
bcrypt = Bcrypt(app)

load_dotenv()
client = MongoClient(os.getenv("MONGODB_URI"))
db = client.get_database("webx_miniproject")

users = db.get_collection("users")

@app.route("/signup", methods=["POST"])
def sign_up():
    username = request.json.get("username")
    email = request.json.get("email")
    password_plain = request.json.get("password")
    
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
    email = request.json.get("email")
    password_plain = request.json.get("password")
    
    if not email or not password_plain:
        return jsonify({"error": "Email and Password are required."}), 400
    
    user = users.find_one({"email": email})
    
    if not user:
        return jsonify({"error": "Invalid email or password."}), 401
    
    if(bcrypt.check_password_hash(user["password"], password_plain)):
        return jsonify({"message": "Login successful.", "userid": str(user["_id"])}), 200
    else:
        return jsonify({"error": "Invalid email or password."}), 401


if(__name__ == "__main__"): 
    app.run()