from flask import render_template, redirect, url_for, flash, request, session
from flask_login import login_user, logout_user, login_required
from login import app, bcrypt, db
from login.models import User
from login.forms import RegisterForm, LoginForm

@app.route('/')
@app.route('/home')
def home_page():
    return render_template('home.html')

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    form = RegisterForm()
    if request.method == 'POST' and form.validate_on_submit():
        existing_user = db.users.find_one({'username': form.username.data})
        if existing_user is None:
            user = User(
                username=form.username.data,
                email_address=form.email_address.data,
                password_hash=bcrypt.generate_password_hash(form.password1.data).decode('utf-8')
            )
            user.save_to_db()
            session['username'] = form.username.data
            flash('Account created successfully! You are now logged in as ' + session['username'], category='success')
            return redirect(url_for('home_page'))
        else:
            flash('Username already exists. Please choose a different one.', category='danger')
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.find_by_username(form.username.data)
        if user and user.check_password_correction(attempted_password=form.password.data):
            login_user(user)
            session['username'] = form.username.data
            flash('Login successful! You are now logged in.', category='success')
            return redirect(url_for('home_page'))
        else:
            flash('Invalid username or password. Please try again.', category='danger')
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout_page():
    logout_user()
    flash("You have been logged out!", category='info')
    return redirect(url_for('home_page'))
