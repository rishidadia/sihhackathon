# from flask import Flask
# from flask_pymongo import PyMongo
# from flask_bcrypt import Bcrypt
# from flask_login import LoginManager

# app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb+srv://sohaajaykhare2006:sX3UUA9AmFzDkair@cluster0.e7d3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# app.config['SECRET_KEY'] = '2ab28c0f6afeb78a44be0807'

# # Initialize PyMongo
# mongodb_client = PyMongo(app)

# # Check if the connection was successful
# try:
#     db = mongodb_client.db
#     db.command("ping")
#     print("MongoDB connection successful.")
# except Exception as e:
#     db = None
#     print(f"MongoDB connection failed: {e}")

# bcrypt = Bcrypt(app)
# login_manager = LoginManager(app)
# login_manager.login_view = "login_page"
# login_manager.login_message_category = "info"


# from flask import Flask
# from pymongo import MongoClient
# from flask_bcrypt import Bcrypt
# from flask_login import LoginManager

# app = Flask(__name__)
# app.config["MONGO_URI"] = "mongodb+srv://sohaajaykhare2006:sX3UUA9AmFzDkair@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority"
# app.config['SECRET_KEY'] = '2ab28c0f6afeb78a44be0807'

# # Initialize MongoClient
# try:
#     client = MongoClient(app.config["MONGO_URI"])
#     db = client.get_database()  # Uses the database specified in the URI
#     db.command("ping")
#     print("MongoDB connection successful.")
# except Exception as e:
#     db = None
#     print(f"MongoDB connection failed: {e}")

# bcrypt = Bcrypt(app)
# login_manager = LoginManager(app)
# login_manager.login_view = "login_page"
# login_manager.login_message_category = "info"

# from flask import Flask
# from flask_pymongo import PyMongo
# from flask_bcrypt import Bcrypt
# from flask_login import LoginManager
# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# uri = "mongodb+srv://sohaajaykhare2006:sX3UUA9AmFzDkair@cluster0.e7d3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# # Create a new client and connect to the server
# app = Flask(__name__)
# client = MongoClient(uri, server_api=ServerApi('1'))
# db = client["CollegeSphere"] 
# collection = db["users"]  # Replace "users" with your collection name
# bcrypt = Bcrypt(client)
# login_manager = LoginManager(client)
# login_manager.login_view = "login_page"
# login_manager.login_message_category = "info"

from flask import Flask
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Create Flask app instance
app = Flask(__name__, static_folder='static')
app.config['SECRET_KEY'] = '2ab28c0f6afeb78a44be0807'  # Set your Flask secret key

# Initialize Bcrypt and LoginManager with the Flask app
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category = "info"

# MongoDB URI
uri = "mongodb+srv://sohaajaykhare2006:sX3UUA9AmFzDkair@cluster0.e7d3t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Select the database and collection
db = client["CollegeSphere"]
collection = db["users"]
