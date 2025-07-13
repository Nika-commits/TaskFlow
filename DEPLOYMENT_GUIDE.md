# 🚀 Free Hosting Guide for Todo Portfolio App

This guide will help you deploy your Todo application for free using:

- **Frontend**: GitHub Pages
- **Backend**: Render.com
- **Database**: MongoDB Atlas

## 📋 Prerequisites

1. GitHub account
2. Render.com account (free)
3. MongoDB Atlas account (free)

---

## 🗄️ Step 1: Set up MongoDB Atlas (Database)

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)

### 1.2 Configure Database

1. Create a database user with username/password
2. Get your connection string
3. Add your IP address to the IP whitelist (or use 0.0.0.0/0 for all IPs)

### 1.3 Get Connection String

Your connection string will look like:

```
mongodb+srv://username:password@cluster.mongodb.net/todo-app?retryWrites=true&w=majority
```

---

## ⚙️ Step 2: Deploy Backend to Render.com

### 2.1 Prepare Your Backend

1. Push your code to GitHub
2. Make sure your backend folder is in the root of your repository

### 2.2 Deploy on Render

1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `todo-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2.3 Set Environment Variables

In Render dashboard, add these environment variables:

- `MONGODB_URI`: Your MongoDB Atlas connection string
- `JWT_SECRET`: A random secret string (e.g., `my-super-secret-jwt-key-2024`)
- `NODE_ENV`: `production`

### 2.4 Update CORS Settings

In `backend/server.js`, update the CORS origins with your actual frontend URL:

```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://your-username.github.io'] // Your GitHub Pages URL
  : ['http://localhost:3000'],
```

### 2.5 Get Your Backend URL

After deployment, you'll get a URL like: `https://todo-backend-xyz.onrender.com`

---

## 🌐 Step 3: Deploy Frontend to GitHub Pages

### 3.1 Update Frontend Configuration

1. Update `frontend/package.json`:

   ```json
   "homepage": "https://your-username.github.io/todo"
   ```

2. Install gh-pages:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

### 3.2 Update API URL

1. Create `.env.production` in frontend folder:

   ```
   REACT_APP_API_URL=https://your-backend-app.onrender.com/api
   ```

2. Update `frontend/src/api/axios.js` to use the production URL

### 3.3 Deploy to GitHub Pages

1. Push your code to GitHub
2. Run deployment:
   ```bash
   cd frontend
   npm run deploy
   ```

### 3.4 Enable GitHub Pages

1. Go to your GitHub repository
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: `gh-pages`
5. Save

Your app will be available at: `https://your-username.github.io/todo`

---

## 🔧 Step 4: Final Configuration

### 4.1 Update Backend CORS

Update `backend/server.js` with your actual GitHub Pages URL:

```javascript
origin: process.env.NODE_ENV === 'production'
  ? ['https://your-username.github.io'] // Replace with your actual URL
  : ['http://localhost:3000'],
```

### 4.2 Test Your Deployment

1. Visit your GitHub Pages URL
2. Test login functionality
3. Test creating/editing tasks
4. Test admin features

---

## 📝 Step 5: Portfolio Documentation

### 5.1 Update README.md

Add deployment information to your README:

```markdown
## 🚀 Live Demo

- **Frontend**: https://your-username.github.io/todo
- **Backend API**: https://todo-backend-xyz.onrender.com

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express, JWT
- **Database**: MongoDB Atlas
- **Hosting**: GitHub Pages (Frontend), Render.com (Backend)
```

### 5.2 Portfolio Description

Use this for your resume/portfolio:

```
Full-Stack Todo Application with Admin Dashboard
- Built with React frontend and Node.js/Express backend
- Features user authentication, task management, and admin role with user assignment
- Includes dark mode, responsive design, and real-time updates
- Deployed on GitHub Pages (frontend) and Render.com (backend)
- Technologies: React, Node.js, Express, MongoDB, JWT, CSS3
```

---

## 🎯 Benefits of This Setup

✅ **Completely Free** - No hosting costs  
✅ **Professional URLs** - Clean, shareable links  
✅ **Scalable** - Easy to upgrade if needed  
✅ **Portfolio Ready** - Perfect for showcasing your skills  
✅ **Reliable** - Industry-standard platforms

---

## 🔍 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your backend CORS origins include your frontend URL
2. **Database Connection**: Verify MongoDB Atlas connection string and IP whitelist
3. **Environment Variables**: Double-check all environment variables are set in Render
4. **Build Errors**: Check that all dependencies are in package.json

### Support:

- Render.com has excellent documentation and support
- MongoDB Atlas has free support for basic issues
- GitHub Pages is very reliable and well-documented

---

## 🎉 You're Ready!

Your Todo app is now live and ready for your portfolio! The combination of GitHub Pages + Render + MongoDB Atlas gives you a professional, free hosting solution that's perfect for showcasing your full-stack development skills.
