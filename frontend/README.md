# Event Ticketing System - Frontend

This is the frontend application for the Event Ticketing System, built with React, TypeScript, and Tailwind CSS.

## Features

- Browse and search events
- User authentication (login/register)
- Purchase tickets
- User dashboard for managing tickets
- Admin dashboard for event management
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript
- State management with Redux Toolkit
- Form handling with Formik and Yup validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Docker (for containerized development)

## Getting Started

### Development Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

The application will be available at http://localhost:3000.

### Docker Setup

1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```

The frontend will be available at http://localhost:3000.

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── store/         # Redux store and slices
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   └── index.tsx      # Application entry point
├── public/            # Static assets
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── tailwind.config.js # Tailwind CSS configuration
└── Dockerfile         # Docker configuration
```

## Available Scripts

- `npm start` - Start the development server
- `npm build` - Build the production bundle
- `npm test` - Run tests
- `npm lint` - Run ESLint
- `npm format` - Format code with Prettier

## Development Guidelines

1. **Component Structure**
   - Use functional components with TypeScript
   - Implement proper prop typing
   - Follow the atomic design pattern
   - Keep components small and focused

2. **State Management**
   - Use Redux Toolkit for global state
   - Use React hooks for local state
   - Implement proper loading and error states

3. **Styling**
   - Use Tailwind CSS utility classes
   - Follow the mobile-first approach
   - Maintain consistent spacing and colors
   - Use the provided component classes

4. **Code Quality**
   - Write meaningful component and function names
   - Add proper TypeScript types
   - Include comments for complex logic
   - Follow ESLint rules
   - Write unit tests for critical components

5. **Git Workflow**
   - Create feature branches from main
   - Write meaningful commit messages
   - Keep commits focused and atomic
   - Create pull requests for code review

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
REACT_APP_BACKEND_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License. 