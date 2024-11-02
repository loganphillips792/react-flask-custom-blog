from flask import Flask, request, jsonify
from flask_cors import CORS
from functools import wraps

from werkzeug.security import generate_password_hash, check_password_hash
from models.models import User, BlogPost

from app import app
from app import db

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
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    print(data)
    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and check_password_hash(user.password, password):
        session['user_id'] = user.id
        return jsonify({
            'message': 'Login Successful',
            'user': {'id': user.id, 'username': user.username}
        })
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
        if 'user_id' not in session:
            return jsonify({'message': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function


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