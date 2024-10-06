# react-flask-custom-blog

# Frontend

cd frontend/react-flask-custom-blog

npm install

npm run dev

## Run Prettier

npm run format

## Run Es Lint

npm run lint

# Backend

## Installing Python dependencies

1. ```python3 -m venv ~/Desktop/CustomBlog```
2. ```source ~/Desktop/CustomBlog/bin/activate``` - this line activates the virtual environment so your Python will use an packages that are installed in it
3. ```which pip``` to verify what is being used (Should point to the one from the virtual environment)
4. ```~/Desktop/CustomBlog/bin/python3 -m pip install --upgrade pip```
5. ```pip install -r requirements.txt```

## Running the application

cd backend

python backend/db/__init__db.py

python app.py