# Testing Guide - Product Management System

## Step-by-Step Testing Instructions

### Prerequisites Check

1. **Check Java version:**
```bash
java -version
```
Should be Java 22 or higher.

2. **Check Node.js version:**
```bash
node -v
```
Should be Node.js 16 or higher.

---

## Step 1: Start the Backend

1. **Open Terminal 1** and navigate to project root:
```bash
cd C:\Users\Lenovo\Desktop\product-management
```

2. **Build the project** (first time only, or after changes):
```bash
./gradlew build
```
Or on Windows:
```bash
gradlew.bat build
```

3. **Start the backend server:**
```bash
./gradlew bootRun
```
Or on Windows:
```bash
gradlew.bat bootRun
```

4. **Wait for the message:** "Started ProductManagementApplication"
   - Backend should be running on `http://localhost:8084`
   - Keep this terminal open!

---

## Step 2: Start the Frontend

1. **Open Terminal 2** (new terminal window)

2. **Navigate to frontend directory:**
```bash
cd C:\Users\Lenovo\Desktop\product-management\frontend
```

3. **Install dependencies** (first time only):
```bash
npm install
```

4. **Start the frontend development server:**
```bash
npm run dev
```

5. **Wait for the message:** "Local: http://localhost:3000"
   - Frontend should be running on `http://localhost:3000`
   - Keep this terminal open!

---

## Step 3: Open the Application

1. **Open your web browser** (Chrome, Firefox, or Edge)

2. **Navigate to:** `http://localhost:3000`

3. You should see the **Login/Register** page

---

## Step 4: Test Registration

1. **Click on the "Register" tab**

2. **Fill in the form:**
   - Username: `admin`
   - Email: `admin@example.com`
   - Password: `admin123`
   - Role: Select **"Admin"**

3. **Click "Register"**

4. **Expected Result:**
   - ✅ You should be automatically logged in
   - ✅ You should see the Products page
   - ✅ Navigation bar should show "admin" and "ADMIN" role

---

## Step 5: Test Login (Optional - Test with Different User)

1. **Click "Logout"** in the navigation bar

2. **Register a regular user:**
   - Username: `user1`
   - Email: `user1@example.com`
   - Password: `user123`
   - Role: Select **"User"**

3. **Click "Register"**

4. **Logout and test login:**
   - Click "Logout"
   - Click "Login" tab
   - Enter username: `user1`
   - Enter password: `user123`
   - Click "Login"

5. **Expected Result:**
   - ✅ Login successful
   - ✅ You should see Products page
   - ✅ Navigation shows "user1" and "USER" role
   - ✅ **"Users" link should NOT appear** (only for ADMIN)

---

## Step 6: Test Product Management

### As any user (USER or ADMIN):

1. **View Products:**
   - You should see the Products page
   - If no products exist, you'll see "No products found"

2. **Create a Product:**
   - Click "Add Product" button
   - Fill in:
     - Name: `Laptop`
     - Description: `High-performance laptop`
     - Price: `999.99`
     - Quantity: `10`
     - Category: (leave empty for now, or create category first)
   - Click "Create"
   - ✅ Product should appear in the list

3. **Edit a Product:**
   - Click "Edit" button on any product
   - Change the price to `899.99`
   - Click "Update"
   - ✅ Product should be updated

4. **Delete a Product:**
   - Click "Delete" button
   - Confirm deletion
   - ✅ Product should be removed

5. **Search Products:**
   - Type in the search box: `Laptop`
   - ✅ Only matching products should appear

6. **Sort Products:**
   - Click on column headers (Name, Price, etc.)
   - ✅ Products should sort ascending/descending

7. **Pagination:**
   - If you have more than 10 products, you'll see pagination
   - Click "Next" and "Previous"
   - ✅ Should navigate between pages

---

## Step 7: Test Category Management

1. **Navigate to Categories:**
   - Click "Categories" in the navigation bar

2. **Create a Category:**
   - Click "Add Category"
   - Name: `Electronics`
   - Description: `Electronic devices and gadgets`
   - Click "Create"
   - ✅ Category should appear

3. **Edit a Category:**
   - Click "Edit" on a category
   - Update the description
   - Click "Update"
   - ✅ Category should be updated

4. **Delete a Category:**
   - Click "Delete"
   - Confirm
   - ✅ Category should be removed

5. **Link Product to Category:**
   - Go back to Products
   - Edit a product
   - Select a category from dropdown
   - Save
   - ✅ Product should show the category

---

## Step 8: Test User Management (Admin Only)

### As ADMIN user:

1. **Login as admin** (if not already):
   - Username: `admin`
   - Password: `admin123`

2. **Navigate to Users:**
   - Click "Users" in navigation bar
   - ✅ Should see list of all users

3. **View Users:**
   - You should see all registered users
   - ✅ Should see username, email, and role

4. **Edit a User:**
   - Click "Edit" on a user
   - Change the role or email
   - Click "Update"
   - ✅ User should be updated

5. **Delete a User:**
   - Click "Delete"
   - Confirm
   - ✅ User should be removed

### As USER (test access restriction):

1. **Login as regular user:**
   - Username: `user1`
   - Password: `user123`

2. **Try to access Users:**
   - ✅ "Users" link should NOT appear in navigation
   - If you manually type `/users` in URL, you should be redirected

---

## Step 9: Test Authentication & Security

1. **Test Token Expiration:**
   - Open browser Developer Tools (F12)
   - Go to Application/Storage → Local Storage
   - Delete the `token` entry
   - Try to access Products
   - ✅ Should redirect to login page

2. **Test Invalid Login:**
   - Logout
   - Try to login with wrong password
   - ✅ Should show error message

3. **Test Protected Endpoints:**
   - Logout
   - Try to access `http://localhost:3000/products` directly
   - ✅ Should redirect to login

---

## Step 10: Test API Directly (Optional)

You can also test the API using curl or Postman:

### Test Login:
```bash
curl -X POST http://localhost:8084/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}"
```

### Test Get Products (with token):
```bash
curl -X GET http://localhost:8084/api/products \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test Get Users (Admin only):
```bash
curl -X GET http://localhost:8084/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN_HERE"
```

---

## Common Issues & Solutions

### Backend won't start:
- ✅ Check if port 8084 is already in use
- ✅ Make sure Java 22+ is installed
- ✅ Check for compilation errors in Terminal 1

### Frontend won't start:
- ✅ Check if port 3000 is already in use
- ✅ Make sure Node.js is installed
- ✅ Run `npm install` again
- ✅ Check for errors in Terminal 2

### Can't login:
- ✅ Make sure backend is running
- ✅ Check browser console (F12) for errors
- ✅ Verify username/password are correct
- ✅ Check that user was created successfully

### 401 Unauthorized errors:
- ✅ Token might be expired (logout and login again)
- ✅ Check that token is being sent in requests
- ✅ Verify backend is running

### CORS errors:
- ✅ Make sure backend is running on port 8084
- ✅ Check that CORS is configured in SecurityConfig

---

## What to Verify

✅ **Authentication:**
- Registration works
- Login works
- Logout works
- Token is stored and sent with requests

✅ **Authorization:**
- USER can access Products and Categories
- USER cannot access Users
- ADMIN can access everything

✅ **CRUD Operations:**
- Create, Read, Update, Delete for Products
- Create, Read, Update, Delete for Categories
- Create, Read, Update, Delete for Users (Admin only)

✅ **Features:**
- Search works
- Sorting works
- Pagination works
- Forms validate input

✅ **Security:**
- Passwords are hashed (check database)
- JWT tokens are required for API calls
- Role-based access is enforced

---

## Success Criteria

If everything works:
- ✅ You can register and login
- ✅ You can manage products and categories
- ✅ Admin can manage users
- ✅ Regular users cannot access user management
- ✅ All CRUD operations work
- ✅ Search, sort, and pagination work
- ✅ No errors in browser console
- ✅ No errors in backend terminal

**Congratulations! Your application is working correctly! 🎉**

