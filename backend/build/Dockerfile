FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

RUN ls

# Copy the current directory contents into the container at /app
COPY ../build/../ /app
COPY ../../requirements.txt /app/requirements.txt

RUN pwd

RUN ls /app

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Define environment variable
ENV FLASK_APP=app.py

# RUN dir -s

# RUN ls
# RUN ls app
RUN ls instance

# RUN python db/__init__db.py

# Run app.py when the container launches
CMD ["flask", "run", "--host=0.0.0.0"]