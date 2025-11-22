# Troubleshooting - Backend Won't Start

## Common Issues and Solutions

### 1. Port 8084 Already in Use

**Error:** `Port 8084 is already in use`

**Solution:**
```bash
# Windows - Find process using port 8084
netstat -ano | findstr :8084

# Kill the process (replace PID with the number from above)
taskkill /PID <PID> /F

# Or change the port in application.properties
server.port=8085
```

### 2. Java Version Issue

**Error:** `Unsupported class file major version` or `Java version mismatch`

**Solution:**
```bash
# Check Java version
java -version

# Should show Java 22 or higher
# If not, install Java 22+ from: https://adoptium.net/
```

### 3. JWT Secret Key Too Short

**Error:** `Key length must be at least 256 bits`

**Solution:**
The secret key in `application.properties` should be at least 32 characters long. Current one is fine, but if you see this error, update it:

```properties
jwt.secret=mySecretKeyForJWTTokenGenerationThatShouldBeAtLeast256BitsLongForSecurityPurposes123456789
```

### 4. Missing Dependencies

**Error:** `Cannot resolve symbol` or `ClassNotFoundException`

**Solution:**
```bash
# Clean and rebuild
gradlew.bat clean
gradlew.bat build --refresh-dependencies
```

### 5. Database Connection Issues

**Error:** `Unable to acquire JDBC Connection`

**Solution:**
- Check if H2 database is properly configured
- Verify `application.properties` has correct database settings
- Try restarting the application

### 6. Spring Security Configuration Issues

**Error:** `BeanCreationException` or security-related errors

**Solution:**
- Check that all security classes are properly annotated
- Verify `SecurityConfig.java` has correct imports
- Make sure `JwtAuthenticationFilter` is properly registered

### 7. Jersey/JAX-RS Configuration Issues

**Error:** `No resource classes found` or Jersey-related errors

**Solution:**
- Verify all controllers are registered in `JerseyConfig.java`
- Check that `@Path` annotations are correct
- Ensure CORS filter is registered

## Step-by-Step Debugging

### Step 1: Check for Compilation Errors
```bash
cd C:\Users\Lenovo\Desktop\product-management
gradlew.bat clean build
```

Look for any red error messages. If you see errors, share them with me.

### Step 2: Check Java Version
```bash
java -version
javac -version
```

Both should show version 22 or higher.

### Step 3: Check Port Availability
```bash
netstat -ano | findstr :8084
```

If something is using port 8084, either:
- Kill that process
- Change port in `application.properties`

### Step 4: Try Running with More Verbose Output
```bash
gradlew.bat bootRun --info
```

This will show more detailed error messages.

### Step 5: Check Logs
Look at the terminal output when you run `gradlew.bat bootRun`. The error message should tell you what's wrong.

## Quick Fixes to Try

1. **Clean and Rebuild:**
```bash
gradlew.bat clean
gradlew.bat build
gradlew.bat bootRun
```

2. **Check for Missing Files:**
Make sure these files exist:
- `src/main/java/com/morcel/productmanagement/util/JwtUtil.java`
- `src/main/java/com/morcel/productmanagement/filter/JwtAuthenticationFilter.java`
- `src/main/java/com/morcel/productmanagement/controller/AuthController.java`
- `src/main/java/com/morcel/productmanagement/config/SecurityConfig.java`

3. **Verify Dependencies:**
Check that `build.gradle` has JWT dependencies:
```gradle
implementation 'io.jsonwebtoken:jjwt-api:0.12.3'
implementation 'io.jsonwebtoken:jjwt-impl:0.12.3'
implementation 'io.jsonwebtoken:jjwt-jackson:0.12.3'
```

## What Error Are You Seeing?

Please share:
1. The exact error message from the terminal
2. What command you ran
3. Any stack trace that appears

This will help me identify the specific issue!

