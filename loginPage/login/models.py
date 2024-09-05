from login import login_manager, db
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
    return user

class User(UserMixin):
    def __init__(self, username, email_address, password_hash, role, _id=None):
        self.username = username
        self.email_address = email_address
        self.password_hash = password_hash
        self.role = role
        self._id = _id if _id else ObjectId()
        

    def get_id(self):
        return str(self._id)

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
        user_data = db.users.find_one({"_id": ObjectId(user_id)})
        if user_data:
            return User(username=user_data['username'], email_address=user_data['email_address'], password_hash=user_data['password_hash'], role=user_data['role'], _id=user_data['_id'])
        return None

    @staticmethod
    def find_by_username(username):
        user_data = db.users.find_one({"username": username})
        if user_data:
            return User(username=user_data['username'], email_address=user_data['email_address'], password_hash=user_data['password_hash'], role=user_data['role'], _id=user_data['_id'])
        return None
        
    @staticmethod
    def find_by_email(email_address):
        user_data = db.users.find_one({"email_address": email_address})
        if user_data:
            return User(username=user_data['username'], email_address=user_data['email_address'], password_hash=user_data['password_hash'], role=user_data['role'], _id=user_data['_id'])
        return None
    
    def save_to_db(self):
        user_data = {
            "_id": self._id,
            "username": self.username,
            "email_address": self.email_address,
            "password_hash": self.password_hash,
            "role": self.role
        }
        # if self._id:
        #     db.users.update_one({"_id": self._id}, {"$set": user_data})
        # else:
        result = db.users.insert_one(user_data)
        self._id = result.inserted_id


