# Product Management System

A full-stack web application for managing products, categories, and users with role-based access control.

## 🚀 Features

### Backend (Spring Boot)
- ✅ RESTful API with JAX-RS (Jersey)
- ✅ JWT Authentication & Authorization
- ✅ Spring Security with role-based access control
- ✅ H2 In-Memory Database
- ✅ JPA/Hibernate for data persistence
- ✅ BCrypt password encryption
- ✅ CORS enabled for frontend communication

### Frontend (React)
- ✅ Modern React application with Vite
- ✅ User Authentication (Login/Register)
- ✅ Role-based UI (USER/ADMIN)
- ✅ Product Management (CRUD with pagination & sorting)
- ✅ Category Management (CRUD with pagination & sorting)
- ✅ User Management (Admin only)
- ✅ Search and filter functionality
- ✅ Responsive design

## 📋 Prerequisites

- **Java 22+**
- **Node.js 16+**
- **Gradle** (included via wrapper)

## 🛠️ Installation & Setup

### Backend Setup

1. Navigate to project root:
```bash
cd product-management
```

2. Build the project:
```bash
# Windows
gradlew.bat build

# Linux/Mac
./gradlew build
```

3. Run the backend:
```bash
# Windows
gradlew.bat bootRun

# Linux/Mac
./gradlew bootRun
```

Backend will start on `http://localhost:8084`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

Frontend will start on `http://localhost:3000`

## 📖 Usage

1. **Start Backend** (Terminal 1):
   ```bash
   gradlew.bat bootRun
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser**: Navigate to `http://localhost:3000`

4. **Register/Login**: Create an account (choose ADMIN role to access all features)

## 🔐 Security & Authentication

- **JWT Tokens**: Secure token-based authentication
- **Role-Based Access**:
  - **USER**: Can view products and categories (read-only)
  - **ADMIN**: Can create, edit, delete products, categories, and manage users
- **Password Security**: BCrypt hashing for all passwords

## 📁 Project Structure

```
product-management/
├── src/                          # Backend (Spring Boot)
│   └── main/
│       ├── java/
│       │   └── com/morcel/productmanagement/
│       │       ├── config/       # Security, CORS, Jersey config
│       │       ├── controller/   # REST controllers
│       │       ├── entity/       # JPA entities
│       │       ├── repository/   # Data repositories
│       │       ├── service/      # Business logic
│       │       ├── filter/      # JWT authentication filter
│       │       ├── util/         # JWT utilities
│       │       └── dto/          # Data transfer objects
│       └── resources/
│           └── application.properties
├── frontend/                     # Frontend (React)
│   └── src/
│       ├── components/          # React components
│       ├── context/             # Auth context
│       ├── services/            # API services
│       └── App.jsx              # Main app
└── build.gradle                 # Gradle configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (ADMIN only)
- `PUT /api/products/{id}` - Update product (ADMIN only)
- `DELETE /api/products/{id}` - Delete product (ADMIN only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create category (ADMIN only)
- `PUT /api/categories/{id}` - Update category (ADMIN only)
- `DELETE /api/categories/{id}` - Delete category (ADMIN only)

### Users
- `GET /api/users` - Get all users (ADMIN only)
- `GET /api/users/{id}` - Get user by ID (ADMIN only)
- `POST /api/users` - Create user (ADMIN only)
- `PUT /api/users/{id}` - Update user (ADMIN only)
- `DELETE /api/users/{id}` - Delete user (ADMIN only)

## 🧪 Testing

See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed testing instructions.

## 📚 Documentation

- [SETUP.md](SETUP.md) - Detailed setup guide
- [START_HERE.md](START_HERE.md) - Quick start guide
- [JWT_IMPLEMENTATION.md](JWT_IMPLEMENTATION.md) - JWT authentication details
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Testing instructions
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Common issues and solutions

## 🛡️ Security Features

- JWT token authentication
- Role-based access control (USER/ADMIN)
- Password hashing with BCrypt
- CORS configuration
- Protected API endpoints
- Token expiration (24 hours)

## 🎯 Technologies Used

### Backend
- Spring Boot 3.5.8
- Spring Security
- Spring Data JPA
- Jersey (JAX-RS)
- JWT (jjwt 0.12.3)
- H2 Database
- Gradle

### Frontend
- React 18.2
- React Router 6.20
- Axios 1.6.2
- Vite 5.4.0

## 📝 License

This project is for educational purposes.

## 👤 Author

Morcel

## 🔗 Repository

https://github.com/morcelz/product-management-app
