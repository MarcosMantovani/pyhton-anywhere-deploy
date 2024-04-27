# Textly
# Text and Image-Based Social Network

## Description
This project is a text and image-based social network similar to Twitter. Users can create profiles, edit information such as name, username, profile picture, banner, and biography, follow other users, create posts with text and image, reply to posts, edit and delete their own posts, search for posts and users using keywords, and recover their password if forgotten. The project is a Full Stack application built with Python, utilizing TypeScript, React, ESLint, Prettier, Redux Thunk, and Styled Components on the frontend, and Django, Djoser for user authentication, and Django Rest Framework on the backend.

## Technologies Used
### Frontend
- TypeScript
- React
- ESLint
- Prettier
- Redux Thunk
- Styled Components

### Backend
- Django
- Djoser
- Django Rest Framework

## Getting Started
To get started with this project, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Run `npm install` to install dependencies.
3. After installation, run `npm run build` to build the frontend files.

### Backend Setup
1. Navigate to the `backend` directory.
2. Install required Python packages with `poetry install`.
3. Make migrations with `poetry run python manage.py makemigrations`.
3. Apply migrations with `poetry run python manage.py migrate`.
5. Finally, start the Django development server with `poetry run python manage.py runserver`.

Now you should be able to access the application at `http://localhost:8000/` in your browser and interact with it.
