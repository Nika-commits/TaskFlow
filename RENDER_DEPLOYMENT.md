# ⚙️ Render.com Deployment Guide

## Step 1: Create Render Account

1. Go to [Render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account

## Step 2: Connect Your Repository

1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository: `Nika-commits/TaskFlow`

## Step 3: Configure the Web Service

Fill in these settings:

- **Name**: `todo-backend` (or any name you prefer)
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

## Step 4: Set Environment Variables

Click "Advanced" and add these environment variables:

| Key           | Value                                                         |
| ------------- | ------------------------------------------------------------- |
| `MONGODB_URI` | Your MongoDB Atlas connection string                          |
| `JWT_SECRET`  | A random secret string (e.g., `my-super-secret-jwt-key-2024`) |
| `NODE_ENV`    | `production`                                                  |

**Important**:

- Replace the MongoDB URI with your actual connection string from Atlas
- Make sure the JWT_SECRET is a strong, random string
- The MONGODB_URI should include your password and database name

## Step 5: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your app
3. Wait for the build to complete (usually 2-5 minutes)

## Step 6: Get Your Backend URL

After successful deployment, you'll get a URL like:

```
https://todo-backend-xyz.onrender.com
```

**Save this URL - you'll need it to update your frontend!**

## Step 7: Test Your Backend

1. Visit your backend URL
2. You should see: `{"message":"Todo API is running"}`
3. Test the health endpoint: `https://your-app.onrender.com/health`

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in package.json
2. **Database connection fails**: Verify your MongoDB URI is correct
3. **Environment variables**: Make sure all required variables are set
4. **Port issues**: Render automatically sets PORT environment variable

### Support:

- Render has excellent documentation and support
- Check the build logs for specific error messages
