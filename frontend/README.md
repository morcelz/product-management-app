# Product Management Frontend

React frontend application for the Product Management System.

## Features

- ✅ **Authentication**: Login and Registration with role-based access
- ✅ **Product Management**: CRUD operations with pagination and sorting
- ✅ **Category Management**: CRUD operations with pagination and sorting
- ✅ **User Management**: Admin-only user management
- ✅ **Modern UI**: Responsive design with modern styling
- ✅ **Search & Filter**: Search functionality for all entities
- ✅ **Dynamic Sorting**: Click column headers to sort data
- ✅ **Pagination**: Navigate through large datasets

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 8084

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:
```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── Products.jsx
│   │   ├── Categories.jsx
│   │   ├── Users.jsx
│   │   ├── Login.jsx
│   │   └── ...
│   ├── context/          # React Context (Auth)
│   ├── services/         # API service layer
│   ├── App.jsx           # Main app component
│   ├── App.css           # Main styles
│   └── main.jsx          # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## API Configuration

The frontend is configured to connect to the backend at `http://localhost:8084/api`. 
This is configured in:
- `vite.config.js` (proxy settings for development)
- `src/services/api.js` (API base URL)

## Authentication

The application uses a simple authentication system:
- Users can register with username, email, and password
- Role can be set during registration (USER or ADMIN)
- Login uses username and password
- JWT token support is prepared (currently using mock tokens)

## Features by Role

### User (USER role)
- View and manage products
- View and manage categories

### Admin (ADMIN role)
- All User permissions
- Manage users (create, edit, delete)

## Notes

- The backend must be running before starting the frontend
- CORS is handled by the Vite proxy in development
- For production, configure CORS on the backend to allow requests from your frontend domain

