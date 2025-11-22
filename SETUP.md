# Product Management System - Setup Guide

This guide will help you set up and run both the backend and frontend of the Product Management System.

## Project Structure

```
product-management/
├── src/                    # Backend (Spring Boot)
│   └── main/
│       ├── java/          # Java source code
│       └── resources/     # Configuration files
└── frontend/              # Frontend (React + Vite)
    └── src/               # React source code
```

## Prerequisites

### Backend
- Java 22 or higher
- Gradle (included via wrapper)

### Frontend
- Node.js 16 or higher
- npm or yarn

## Backend Setup

1. **Navigate to the project root:**
```bash
cd product-management
```

2. **Build the project:**
```bash
./gradlew build
```

3. **Run the backend:**
```bash
./gradlew bootRun
```

The backend will start on `http://localhost:8084`

### Backend API Endpoints

- **Products**: `http://localhost:8084/api/products`
- **Categories**: `http://localhost:8084/api/categories`
- **Users**: `http://localhost:8084/api/users`

### Database

The application uses H2 in-memory database. You can access the H2 console at:
`http://localhost:8084/h2-console`

- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (empty)

## Frontend Setup

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

## Running the Complete Application

1. **Terminal 1 - Start Backend:**
```bash
cd product-management
./gradlew bootRun
```

2. **Terminal 2 - Start Frontend:**
```bash
cd product-management/frontend
npm install  # Only needed first time
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

## First Steps

1. **Register a new user:**
   - Click on "Register" tab
   - Fill in username, email, password
   - Choose role (USER or ADMIN)
   - Click "Register"

2. **Login:**
   - Use your username and password to login

3. **Start managing:**
   - **Products**: View, create, edit, delete products
   - **Categories**: Manage product categories
   - **Users** (Admin only): Manage system users

## Features

### Frontend Features
- ✅ User authentication (Login/Register)
- ✅ Role-based access control (USER/ADMIN)
- ✅ Product management with pagination and sorting
- ✅ Category management with pagination and sorting
- ✅ User management (Admin only)
- ✅ Search and filter functionality
- ✅ Responsive design
- ✅ Modern UI with gradient styling

### Backend Features
- ✅ RESTful API with JAX-RS (Jersey)
- ✅ Spring Security (basic setup)
- ✅ JPA/Hibernate for database operations
- ✅ H2 in-memory database
- ✅ CORS enabled for frontend communication
- ✅ Input validation

## Development Notes

### CORS Configuration
CORS is configured to allow requests from the frontend. The configuration is in:
- `SecurityConfig.java` - Spring Security CORS
- `CorsFilter.java` - Jersey/JAX-RS CORS filter

### Authentication
Currently, authentication uses a simple username/password check. For production, you should:
1. Implement JWT token generation in the backend
2. Add proper password hashing (BCrypt is already configured)
3. Create `/api/auth/login` endpoint
4. Update frontend to use JWT tokens

### Database
The database is in-memory and will reset on each restart. To persist data:
1. Change `spring.jpa.hibernate.ddl-auto` from `create-drop` to `update`
2. Change database URL to file-based: `jdbc:h2:file:./data/productdb`

## Troubleshooting

### Backend won't start
- Check if port 8084 is available
- Verify Java version: `java -version` (should be 22+)
- Check Gradle wrapper: `./gradlew --version`

### Frontend won't start
- Check if port 3000 is available
- Verify Node.js version: `node -v` (should be 16+)
- Delete `node_modules` and run `npm install` again

### CORS errors
- Ensure backend is running on port 8084
- Check that CORS filters are registered
- Verify Vite proxy configuration in `vite.config.js`

### API calls failing
- Ensure backend is running
- Check browser console for errors
- Verify API base URL in `frontend/src/services/api.js`

## Next Steps for Production

1. **Security:**
   - Implement JWT authentication
   - Add password encryption
   - Implement role-based endpoint protection
   - Add HTTPS

2. **Database:**
   - Switch to PostgreSQL or MySQL
   - Add database migrations
   - Implement connection pooling

3. **Frontend:**
   - Add error boundaries
   - Implement loading states
   - Add form validation
   - Optimize bundle size

4. **Testing:**
   - Add unit tests
   - Add integration tests
   - Add E2E tests

## Support

For issues or questions, check:
- Backend logs in the terminal
- Browser console for frontend errors
- Network tab for API request/response details

