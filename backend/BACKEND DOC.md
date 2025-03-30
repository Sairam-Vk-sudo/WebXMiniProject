# Flask Backend Documentation

## Requirements

-   Flask
-   Flask-Bcrypt
-   pymongo
-   python-dotenv

## Installation

1.  Install dependencies:

```sh
pip install -r requirements.txt
```

2. Set up the environment variables in a `.env` file:

```env
MONGODB_URI="MONGO URI DAALO IDHAR"
```

## API Endpoints

### 1. User Signup

**Endpoint:** `POST /signup`

**Description:** Registers a new user.

**Request Body:**

```json
{
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "securepassword"
}
```

**Note:**

-   Email format is not checked in backend pls do in frontend.

**Responses:**

-   `201 Created`: User created successfully.
-   `400 Bad Request`: Missing required fields.
-   `409 Conflict`: Email is already registered.
-   `500 Internal Server Error`: Database error.

### 2. User Login

**Endpoint:** `POST /login`

**Description:** Authenticates a user with email and password.

**Request Body:**

```json
{
    "email": "user@example.com",
    "password": "securepassword"
}
```

**Responses:**

-   `200 OK`: Login successful. userid: id of the user that logged in.
-   `400 Bad Request`: Missing email or password.
-   `401 Unauthorized`: Invalid credentials.

## Running the Application

Run the following command:

```sh
python app.py
```