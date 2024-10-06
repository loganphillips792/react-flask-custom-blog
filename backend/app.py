# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db = SQLAlchemy(app)

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'created_at': self.created_at.isoformat()
        }

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
    posts = BlogPost.query.order_by(BlogPost.created_at.desc()).all()
    return jsonify([post.to_dict() for post in posts])

@app.route('/api/blog/<int:post_id>', methods=['GET'])
def get_blog_post(post_id):
    post = BlogPost.query.get_or_404(post_id)
    return jsonify(post.to_dict())

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)