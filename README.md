# Task Management Application

## Overview
This project is a **Task Management Application** that allows users to create, edit, view, and delete tasks. The frontend is built with **React**, while the backend uses **Node.js** and **Express**, with **JWT** for authentication. The application follows a **Single Page Application (SPA)** model, including user login, registration, and session management.

## Project Structure

### Frontend
- **Language and Frameworks:** React, JavaScript (ES6+), Axios
- **Authentication:** JWT for login/logout
- **Forms:** For task creation and editing
- **Componentization:** Reusable components throughout the app

### Backend
- **Language and Frameworks:** Node.js, Express.js
- **Database:** MySQL
- **Authentication:** JWT for token generation and validation
- **Routes:** RESTful APIs for CRUD operations on tasks and user authentication
- **Session Management:** JWT stored in localStorage

---

## Folder Structure

### Backend

```
/backend
│
├── app.js             # Entry point for the Express application
├── config/
│   └── db.js          # Database configuration (MySQL)
├── controllers/
│   ├── authController.js   # Handles login and user registration
│   └── taskController.js   # Handles CRUD operations for tasks
├── middleware/
│   └── authMiddleware.js   # Middleware for JWT authentication
├── models/
│   ├── User.js        # User model
│   └── Task.js        # Task model
├── routes/
│   ├── authRoutes.js  # Authentication routes (login, register)
│   └── taskRoutes.js  # Task routes (CRUD operations)
└── package.json       # Backend dependencies
```

### Frontend

```
/frontend
│
├── public/
├── src/
│   ├── api/
│   │   ├── authService.js     # Auth services for login and registration
│   │   └── taskService.js     # Services for handling task-related API calls
│   ├── components/
│   │   ├── Navbar.js          # Navigation bar
│   │   ├── TaskList.js        # List of tasks
│   │   ├── CreateTask.js      # Form for creating tasks
│   │   ├── EditTask.js        # Form for editing tasks
│   │   └── TaskItem.js        # Individual task component
│   ├── pages/
│   │   ├── Dashboard.js       # Main page with task list
│   │   ├── LoginPage.js       # Login page
│   │   ├── RegisterPage.js    # Registration page
│   │   └── CreateTaskPage.js  # Page for creating new tasks
│   ├── App.js                 # Main app component (routes configuration)
│   └── index.js               # React entry point
└── package.json               # Frontend dependencies
```

---

## Features

### 1. User Authentication (Login and Registration)
- The backend offers APIs for user login and registration using **JWT**.
- On the frontend, JWT authentication is implemented by storing the token in `localStorage` and including it in the authorization headers for all subsequent API requests.

### 2. Task Creation and Management
- Users can create new tasks, view a list of existing tasks, edit them, and delete them.
- Each task contains a title, description, and completion status.

### 3. Task Listing and Editing
- After login, the tasks are listed on the dashboard.
- Users can click on a task to edit or delete it.

### 4. RESTful API (Backend)
- The backend provides a set of API routes to handle task management:
  - **POST /api/auth/register**: Register a new user
  - **POST /api/auth/login**: Log in a user
  - **GET /tasks**: Retrieve all tasks
  - **POST /tasks**: Create a new task
  - **GET /tasks/:id**: Retrieve details of a specific task
  - **PUT /tasks/:id**: Update a task
  - **DELETE /tasks/:id**: Delete a task

### 5. JWT Implementation
- The backend uses **JWT** to protect task-related routes, ensuring only authenticated users can create, update, or delete tasks.
- The token is checked for validity in all task routes, preventing unauthorized access.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register new users
- **POST** `/api/auth/login` - Log in existing users

### Tasks
- **GET** `/tasks` - Retrieve all tasks for the logged-in user
- **POST** `/tasks` - Create a new task
- **GET** `/tasks/:id` - Retrieve details of a specific task
- **PUT** `/tasks/:id` - Update a task
- **DELETE** `/tasks/:id` - Delete a specific task

---

## Installation and Setup

### Running Locally

#### Backend

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the database:
   - Ensure you have a running MySQL database. Create a `.env` file with the following variables:
     ```bash
     DB_HOST=localhost
     DB_USER=root
     DB_PASS=password
     DB_NAME=task_manager
     JWT_SECRET=your_jwt_secret
     ```

4. Start the backend server:
   ```bash
   npm start
   ```

#### Frontend

1. Clone the repository:
   ```bash
   git clone <https://github.com/Thiagomartinsvieira/fullstack-tasks>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the `.env` file:
   - Add the API URL in the `.env` file:
     ```bash
     REACT_APP_API_URL=http://localhost:3000
     ```

4. Start the frontend server:
   ```bash
   npm start
   ```

---

## Running the Project with Docker

### Docker Setup

#### Docker Compose Configuration

To run the entire application in Docker, create the following `docker-compose.yml` file in the root of your project:

```yaml
version: '3.8'
services:
  db:
    image: mysql:8.0
    container_name: mysql-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: task_manager
      MYSQL_USER: user
      MYSQL_PASSWORD: 1234
    ports:
      - "3306:3306"
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

### Steps to Run in Docker

1. Clone the repository:
   ```bash
   git clone <https://github.com/Thiagomartinsvieira/fullstack-tasks>
   cd backend
   ```

2. Navigate to the project root and ensure the `docker-compose.yml` file is in place.

3. Build and start the services:
   ```bash
   docker-compose up -d
   ```
   
### Verifying Docker Setup

- Run `docker ps` to verify that the MySQL containers are running.
- Use the following command to access the MySQL container:
  ```bash
  docker exec -it mysql-db mysql -u root -p
  ```

---

## Future Improvements

- Implement advanced filtering for tasks (by status, date, etc.).
- Improve user interface for a more intuitive user experience.
- Add notifications for task creation, updates, and deletions.
- Implement pagination and optimizations for handling large volumes of data.
- Add password recovery functionality for user authentication.

---

## Key Dependencies

### Backend
- **Node.js**
- **Express.js**
- **JWT (Json Web Token)**
- **MySQL**

### Frontend
- **React**
- **Axios**
- **React Router**
- **TailwindCSS**

---

## License

This project is licensed under the [MIT License](LICENSE).

---
