from app import db
from sqlalchemy.orm import Mapped, mapped_column
import datetime
import pytz
from flask_sqlalchemy import SQLAlchemy

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.username}'

# https://docs.sqlalchemy.org/en/20/core/types.html
class BlogPost(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    # title = db.Column(db.String(100), nullable=False)
    # content = db.Column(db.Text, nullable=False)
    # created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # updated_at = db.Column(db.DateTime, default=datetime.utcnow)
    __tablename__ = 'blog_posts'

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(nullable=False)
    content: Mapped[str] = mapped_column(nullable=False)
    created_at: Mapped[datetime.datetime] = mapped_column(db.DateTime, default=datetime.datetime.now(datetime.timezone.utc)) 

    def to_dict(self):
        # for tz in pytz.all_timezones:
            # print(tz)
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