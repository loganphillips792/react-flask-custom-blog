from app import app
from app import db
from flask_cors import CORS

cors = CORS(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)