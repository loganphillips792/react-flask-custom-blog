import os

from flask import Flask

from logging.config import dictConfig
from dotenv import load_dotenv

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        'stream': 'ext://flask.logging.wsgi_errors_stream',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

load_dotenv()

SQLALCHEMY_DATABASE_URI=os.environ.get('SQLALCHEMY_DATABASE_URI')
SESSION_LIFETIME_DAYS=os.environ.get('SESSION_LIFETIME_DAYS')
SECRET_KEY=os.environ.get('SECRET_KEY')

app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SESSION_LIFETIME'] = SESSION_LIFETIME_DAYS
app.config['SECRET_KEY'] = SECRET_KEY

db = SQLAlchemy(app)

from . import routes