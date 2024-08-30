from login import login_manager
from flask_login import UserMixin
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

bcrypt = Bcrypt()
mongo = PyMongo()

@login_manager.user_loader
def load_user(user_id):
    # Fetch user from MongoDB using the user_id
    user = User.find_by_id(user_id)
    if user:
        return User(**user)
    return None

class User(UserMixin):
    def __init__(self, username, email_address, password_hash, _id=None):
        self.username = username
        self.email_address = email_address
        self.password_hash = password_hash
        self._id = _id

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = bcrypt.generate_password_hash(plain_text_password).decode('utf-8')

    def check_password_correction(self, attempted_password):
        return bcrypt.check_password_hash(self.password_hash, attempted_password)

    @staticmethod
    def find_by_id(user_id):
        return mongo.db.users.find_one({"_id": ObjectId(user_id)})

    @staticmethod
    def find_by_username(username):
        return mongo.db.users.find_one({"username": username})

    def save_to_db(self):
        user_data = {
            "username": self.username,
            "email_address": self.email_address,
            "password_hash": self.password_hash
        }
        if self._id:
            mongo.db.users.update_one({"_id": self._id}, {"$set": user_data})
        else:
            result = mongo.db.users.insert_one(user_data)
            self._id = result.inserted_id


