# react-flask-custom-blog

https://blog.miguelgrinberg.com/post/the-flask-mega-tutorial-part-v-user-logins


https://flask-login.readthedocs.io/en/latest/


# TODO:

- Use flask login for authentication for blog
- move register and login methods to separate files
- allow user to upload image for blog post
- If user has admin privileges, they can delete blog posts
- https://www.reddit.com/r/laravel/comments/1e78vct/strategy_for_permission_and_authorisation_design/
- Claude code for flask roles and permissions
- Run app via flask command instead of python3
- When merged into main, automatically deploys pytohn code to digital ocean and restarts necessary services
- Put grafana and prometheus on DO server
- Deploy python to DO and restart through actions
- login page UI

# Frontend

1. cd frontend/react-flask-custom-blog
2. npm install
3. npm run dev

## Run Prettier

npm run format

## Run Es Lint

npm run lint

# Backend

## Without Docker

### Installing Python dependencies

1. ```python3 -m venv ~/Desktop/CustomBlog```
2. ```source ~/Desktop/CustomBlog/bin/activate``` - this line activates the virtual environment so your Python will use an packages that are installed in it
3. ```which pip``` to verify what is being used (Should point to the one from the virtual environment)
4. ```~/Desktop/CustomBlog/bin/python3 -m pip install --upgrade pip```
5. ```pip install -r backend/requirements.txt```

### Running the application

1. cd backend
2. Create .env file based off of .env.example
3. python db/__init__db.py
4. python app.py

## With Docker

cd backend
docker build -t flask-app -f ./build/Dockerfile .
docker run -d -p 5001:5000 --env-file .env --name backend-container-2 flask-app

# Frontend routes

- /
- /create-blog-post
- /all-blog-posts
- /blog/:blogPostId
- /login
- /admin (protected route)
- not found