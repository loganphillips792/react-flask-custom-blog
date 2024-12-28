from flask import Flask, request, jsonify, session
from flask_cors import CORS
from functools import wraps

from werkzeug.security import generate_password_hash, check_password_hash
from models.models import User, BlogPost, Session

from app import app
from app import db

from flask_login import LoginManager, current_user, login_user

from datetime import datetime, timezone, timedelta

import secrets

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    # Check if there is an active session
    if 'session_id' in session:
        db_session = Session.query.filter_by(
            session_id=session['session_id'],
            # is_active=True
        ).first()

        if db_session and db_session.expires_at > datetime.now(timezone.utc):
            return User.query.get(int(user_id))
    return None

def create_session(user, remember=False):
    # Generate a unique session ID
    session_id = secrets.token_urlsafe(32)

    # calculate expirtation time
    duration = app.config['SESSION_LIFETIME'] if remember else timedelta(days=1)
    expires_at = datetime.now(timezone.utc) + duration

    db_session = Session(
        session_id=session_id,
        user_id=user.id,
        expires_at=expires_at,
    )

    db.session.add(db_session)
    db.session.commit()

    # store session id in flask session
    # session['session_id'] = session_id
    return db_session

@app.route('/api/save-blog-post', methods=['POST'])
def save_blog_post():
    data = request.json
    title = data.get('title', 'Untitled')
    content = data.get('content')
    
    if not content:
        return jsonify({'error': 'Content is required'}), 400

    new_post = BlogPost(title=title, content=content)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Blog post saved successfully', 'id': new_post.id}), 201

@app.route('/api/all-blog-posts', methods=['GET'])
def get_all_blog_posts():
    app.logger.info('getting all blog posts...')
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/blog/<int:post_id>', methods=['GET'])
def get_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return jsonify(post.to_dict())

@app.route('/api/register', methods=['POST'])
def register():
    user = User()

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(data)
    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    hashed_password = user.set_password(password=password)
    new_user = User(username=username, encrypted_password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'})

@app.route('/api/login', methods=['POST'])
def login():
    print(current_user)
    # The current_user variable comes from Flask-Login, and can be used at any time during the handling of a request to obtain the user object that represents the client of that request. The value of this variable can be a user object from the database (which Flask-Login reads through the user loader callback I provided above), or a special anonymous user object if the user did not log in yet
    # if current_user.is_authenticated:
    #     return jsonify({'message': 'User is already logged in'})

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user)

        db_session = create_session(user, False)
        
        # session['user_id'] = user.id

        print(db_session.session_id)

        resp = jsonify({
            'message': 'Login Successful',
            'user': {'id': user.id, 'username': user.username}
        })
        print("returning cookies...")
        resp.set_cookie('session_id', db_session.session_id)

        return resp
    return jsonify({'error': 'Invalid username or password'})

@app.route('/api/logout', methods=['POST'])
def logout():
    db.session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'})

@app.route('/api/check-auth', methods=['GET'])
def check_auth():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        return jsonify({
            'authenticated': True,
            'user': {'id': user.id, 'username': user.username}
        })
    return jsonify({'authenticated': False}), 401

@app.route('/api/hello-world', methods=['GET'])
def hello_world():
    app.logger.info('hello world...')
    return jsonify({'message': "hello world"}), 200

# Authentication decorator
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # get session ID from cookie
        session_id = request.cookies.get('session_id')

        if not session_id:
            return jsonify({'message': 'No session cookie found'}), 401
        
        session = db.session.query(Session).filter_by(
            session_id=session_id,
            # is_active=True
        ).one()

        # check if the session has expired
        if session.expires_at < datetime.now(timezone.utc):
            # deactivate expired session
            session.is_active = False
            db.session.commit()
            return jsonify({'message': 'Session expired'}), 401

        # Update last_accessed timestamp
        # session.last_accessed = datetime.utcnow()
        # db.session.commit()


        # if 'user_id' not in session:
        #     return jsonify({'message': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function

# Role-based authorization
def require_role(role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if 'user_id' not in session:
                return jsonify({'message': 'Unauthorized'}), 401
            
            conn = sqlite3.connect('users.db')
            c = conn.cursor()
            c.execute('SELECT role FROM users WHERE id = ?', (session['user_id'],))
            user_role = c.fetchone()[0]
            conn.close()
            
            if user_role != role:
                return jsonify({'message': 'Forbidden'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator

# @app.route('/protected', methods=['GET'])
# @login_required
# def protected():
#     conn = sqlite3.connect('blog.db')
#     c = conn.cursor()
#     c.execute('SELECT username FROM users WHERE id = ?', (session['user_id'],))
#     user = c.fetchone()
#     conn.close()
    
#     return jsonify({
#         'message': 'This is a protected route',
#         'user': user[0]
#     })