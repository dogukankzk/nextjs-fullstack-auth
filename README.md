# 🔐 Next.js Authentication System with Reset Password

🚀 A **full authentication system** built with **Next.js, MongoDB, and Tailwind CSS**.  
Includes **signup, login, email verification, password reset**, and **secure JWT authentication**.

---

## 🌟 Features

✅ **User Authentication** (Signup, Login, Logout)  
✅ **Email Verification** (via Mailtrap)  
✅ **Password Reset** (via email)  
✅ **Secure JWT Token Storage** (HTTP-only cookies)  
✅ **React Hot Toast for notifications**  
✅ **Protected Routes Middleware**  
✅ **Styled with Tailwind CSS**  

---

## 🛠️ **Technologies Used**
- **Next.js 14** (App Router)
- **TypeScript**
- **MongoDB** (via Mongoose)
- **Tailwind CSS**
- **bcryptjs** (Password Hashing)
- **jsonwebtoken** (JWT Authentication)
- **nodemailer** (Email service)
- **react-hot-toast** (Notifications)
- **Next.js Middleware** (Protected Routes)

---

## 🏗️ **Setup & Installation**
### 1️⃣ Clone the repository  

git clone https://github.com/dogukankzk/nextjs-fullstack-auth.git  
cd nextjs-auth

### 2️⃣ Install dependencies  
npm install


### 3️⃣ Create a .env.local file and add:

MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/DATABASE_NAME  
TOKEN_SECRET=your-secret-key  
MAILTRAP_USER=your-mailtrap-username  
MAILTRAP_PASS=your-mailtrap-password  
DOMAIN=http://localhost:3000  

### 4️⃣ Start the development server    
npm run dev

---

## 🛠️ API Routes  
### 📌 Authentication  
🔹 POST /api/users/signup → Register a new user  
🔹 POST /api/users/login → Authenticate and return a JWT token  
🔹 POST /api/users/logout → Logout and clear the JWT  

### 📌 Email Verification   
🔹 POST /api/users/verifyemail → Verifies email using a token  

### 📌 Password Reset  
🔹 POST /api/users/forgotpassword → Sends a reset email  
🔹 POST /api/users/resetpassword → Resets password  

### 📌 User Data  
🔹 GET /api/users/me → Fetch current user data  

---

## 🛡️ Security Features  
Passwords hashed with bcryptjs  
Tokens stored securely in HTTP-only cookies  
Protected Routes using Next.js middleware  
Environment variables for sensitive data  

---

## 💡 Want to Contribute?  
Feel free to fork this repo and submit a pull request! 🚀  

---

## 📞 Contact  
👤 Kazkondu Dogukan  
📧 Email: dogukan.kazkondu.dev@gmail.com  
🔗 GitHub: https://github.com/dogukankzk  

---

## 📜 License  
This project is MIT Licensed. Feel free to use it!  

