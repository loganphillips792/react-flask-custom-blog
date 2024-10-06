# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column
from flask_cors import CORS
import datetime
import pytz

app = Flask(__name__)
cors = CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blog.db'
db = SQLAlchemy(app)

# https://docs.sqlalchemy.org/en/20/core/types.html
class BlogPost(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String(100), nullable=False)
    # content = db.Column(db.Text, nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    content: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(db.DateTime, default=datetime.datetime.now(datetime.timezone.utc)) 

    def to_dict(self):
        for tz in pytz.all_timezones:
            print(tz)
        # The given UTC timestamp
        utc_timestamp = str(self.created_at)

        # Convert string to datetime object
        utc_datetime = datetime.datetime.strptime(utc_timestamp, "%Y-%m-%d %H:%M:%S.%f")

        # Set the timezone to UTC
        utc_datetime = utc_datetime.replace(tzinfo=pytz.UTC)

        # Convert to local timezone
        local_timezone = pytz.timezone("America/Chicago")  # Replace with your local timezone
        local_datetime = utc_datetime.astimezone(local_timezone)

        # Format the result
        result = local_datetime.strftime("%Y-%m-%d %H:%M:%S")

        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            # 'created_at': self.created_at.isoformat()
            'created_at': result
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