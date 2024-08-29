from login import app
from flask import render_template, redirect, url_for, flash, request, session
from login.models import Item, User
from login.forms import RegisterForm, LoginForm
from login import db
from flask_login import login_user, logout_user, login_required
import bcrypt

@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    form = RegisterForm()
    if request.method=='POST' and form.validate_on_submit():
        users = db.users
        existing_user = users.find_one({'username': request.form['username']})
        if existing_user is None:
            hashpass = bcrypt.hashpw(request.form['password1'].encode('utf-8'), bcrypt.gensalt())
            users.insert_one({'username':request.form['username'], 'password':hashpass})  
            session['username'] = request.form['username']
            flash('Account created successfully! You are now logged in as ' + session['username'], category='success')

            return redirect(url_for('home_page'))
        if form.errors != {}:
            for err_msg in form.errors.values():
                flash(f'There was an error with creating a user: {err_msg}', category='danger')
            
        return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    form = LoginForm()
    users = db.users
    login_user = users.find_one({'username': request.form['username']})
    if form.validate_on_submit() and login_user:
        if bcrypt.hashpw(request.form['password'].encode('utf-8'), login_user['password'].encode('utf-8')) == login_user['password'].encode('utf-8'):
            session['username'] = request.form['username']
            flash('Account created successfully! You are now logged in as ' + session['username'], category='success')
            return redirect(url_for('home_page'))
        else:
            flash('Username and password are not a match! Please try again', category='danger')
    return render_template('login.html', form=form)

@app.route('/logout')
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for("home_page"))
