# Event Ticketing System

This project is an Event Ticketing System, consisting of a backend and frontend application. The backend is built with Node.js and MongoDB, while the frontend is developed using React, TypeScript, and Tailwind CSS.

## Features

- User authentication and authorization
- Event browsing and ticket purchasing
- User dashboard for managing tickets
- Admin dashboard for event management
- Responsive design with Tailwind CSS
- State management with Redux Toolkit
- Form handling with Formik and Yup validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (for containerized development)

## Getting Started

### Development Setup

1. **Backend Setup:**

   Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
Start the backend server:

npm start
The backend will be available at http://localhost:5000.

Frontend Setup:

Navigate to the frontend directory and install dependencies:

cd frontend
npm install
Start the frontend development server:

npm start
The frontend will be available at http://localhost:3000.

Docker Setup
Build and start the containers:

docker-compose up --build
The application will be available at http://localhost:3000.

Project Structure
project-root/
├── backend/
│   ├── src/            # Backend source code
│   ├── Dockerfile      # Backend Docker configuration
│   └── package.json    # Backend dependencies and scripts
├── frontend/
│   ├── src/            # Frontend source code
│   ├── Dockerfile      # Frontend Docker configuration
│   └── package.json    # Frontend dependencies and scripts
└── docker-compose.yml  # Docker Compose
