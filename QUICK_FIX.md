# Quick Fix - Backend Won't Start

## Most Common Issues:

### 1. **Port 8084 is Already in Use**

**Quick Fix:**
```powershell
# Find what's using port 8084
netstat -ano | findstr :8084

# Kill it (replace PID with the number you see)
taskkill /PID <PID> /F
```

Or change port in `application.properties`:
```properties
server.port=8085
```

### 2. **Java Version Wrong**

Check your Java version:
```powershell
java -version
```

Should show Java 22. If not, download from: https://adoptium.net/

### 3. **Dependencies Not Downloaded**

Try this:
```powershell
cd C:\Users\Lenovo\Desktop\product-management
gradlew.bat clean
gradlew.bat build --refresh-dependencies
gradlew.bat bootRun
```

### 4. **Check the Exact Error**

When you run `gradlew.bat bootRun`, what error message do you see?

Common errors:
- **"Port already in use"** → See fix #1
- **"BeanCreationException"** → Usually a configuration issue
- **"ClassNotFoundException"** → Missing dependency
- **"Key length must be..."** → JWT secret too short (should be fixed now)

## What to Do Right Now:

1. **Open PowerShell/Command Prompt**

2. **Navigate to project:**
```powershell
cd C:\Users\Lenovo\Desktop\product-management
```

3. **Try to run:**
```powershell
gradlew.bat bootRun
```

4. **Copy the ENTIRE error message** and share it with me

The error message will tell us exactly what's wrong!

## Alternative: Run with More Details

```powershell
gradlew.bat bootRun --stacktrace --info
```

This shows more detailed error information.

