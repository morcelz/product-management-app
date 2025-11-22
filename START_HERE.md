# 🚀 How to Start Your Application

## ⚠️ IMPORTANT: Use 2 Separate Terminal Windows

You need **TWO terminal windows** - one for backend, one for frontend.

---

## 📋 STEP 1: Start the Backend

### Open Terminal/Command Prompt #1

**If using PowerShell:**
```powershell
cd C:\Users\Lenovo\Desktop\product-management
.\gradlew.bat bootRun
```

**If using Command Prompt (cmd):**
```cmd
cd C:\Users\Lenovo\Desktop\product-management
gradlew.bat bootRun
```

### ✅ Wait for this message:
```
Started ProductManagementApplication
```

**Keep this terminal open!** The backend is running on `http://localhost:8084`

---

## 📋 STEP 2: Start the Frontend

### Open a NEW Terminal/Command Prompt #2

**If using PowerShell:**
```powershell
cd C:\Users\Lenovo\Desktop\product-management\frontend
npm install
npm run dev
```

**If using Command Prompt (cmd):**
```cmd
cd C:\Users\Lenovo\Desktop\product-management\frontend
npm install
npm run dev
```

**Note:** `npm install` only needs to be run once (the first time). After that, just use `npm run dev`.

### ✅ Wait for this message:
```
  ➜  Local:   http://localhost:3000/
```

**Keep this terminal open too!**

---

## 🌐 STEP 3: Open in Browser

Open your web browser and go to:
```
http://localhost:3000
```

---

## 🔧 If Port 8084 is Already in Use

If you see "Port 8084 was already in use", run this first:

**PowerShell:**
```powershell
netstat -ano | findstr :8084
taskkill /PID <PID_NUMBER> /F
```

**Command Prompt:**
```cmd
netstat -ano | findstr :8084
taskkill /PID <PID_NUMBER> /F
```

Replace `<PID_NUMBER>` with the number you see from the first command.

---

## 📝 Quick Reference

### Backend Commands:
```powershell
# PowerShell
cd C:\Users\Lenovo\Desktop\product-management
.\gradlew.bat bootRun
```

```cmd
# Command Prompt
cd C:\Users\Lenovo\Desktop\product-management
gradlew.bat bootRun
```

### Frontend Commands:
```powershell
# PowerShell
cd C:\Users\Lenovo\Desktop\product-management\frontend
npm run dev
```

```cmd
# Command Prompt
cd C:\Users\Lenovo\Desktop\product-management\frontend
npm run dev
```

---

## ✅ Checklist

- [ ] Backend terminal shows "Started ProductManagementApplication"
- [ ] Frontend terminal shows "Local: http://localhost:3000"
- [ ] Browser opens to http://localhost:3000
- [ ] You can see the Login/Register page

---

## 🆘 Troubleshooting

**Backend won't start?**
- Check if port 8084 is free: `netstat -ano | findstr :8084`
- Kill any process using it: `taskkill /PID <PID> /F`

**Frontend won't start?**
- Make sure you ran `npm install` first
- Check if port 3000 is free

**Can't login?**
- Make sure backend is running (check Terminal #1)
- Check browser console (F12) for errors

---

## 🎉 You're Ready!

Once both are running:
1. Register a new user (choose ADMIN role to test all features)
2. Login
3. Start managing products, categories, and users!

