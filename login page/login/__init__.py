from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///market.db'
app.config['SECRET_KEY'] = '2ab28c0f6afeb78a44be0807'
db = SQLAlchemy(app)
app.app_context().push()
bcrypt = Bcrypt(app)