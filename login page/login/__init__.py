from flask import Flask
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
app.config["MONGO_URI"]="mongodb://localhost:27017/CollegeSphere"
app.config['SECRET_KEY'] = '2ab28c0f6afeb78a44be0807'
db = PyMongo(app).db
app.app_context().push()
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login_page"
login_manager.login_message_category = "info"

