from flask_login import UserMixin
from login import db, bcrypt, login_manager

@login_manager.user_loader
def load_user(username):
    # Fetch user from MongoDB using the username
    user = db.users.find_one({'username': username})
    if user:
        return User(user['username'], user['email_address'], user['password'])
    return None

class User(UserMixin):
    def __init__(self, username, email_address, password):
        self.username = username
        self.email_address = email_address
        self.password = password

    def check_password(self, password):
        # Check hashed password
        return bcrypt.check_password_hash(self.password, password)


