# 🗄️ MongoDB Atlas Setup Guide

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" or "Sign Up"
3. Create your account (use your email)

## Step 2: Create a Cluster

1. **Choose Plan**: Select "FREE" tier (M0)
2. **Cloud Provider**: Choose AWS, Google Cloud, or Azure (any is fine)
3. **Region**: Choose closest to you (e.g., US East for US)
4. **Cluster Name**: Leave as default or name it "todo-cluster"
5. Click "Create"

## Step 3: Set Up Database Access

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. **Username**: Create a username (e.g., "todo-user")
4. **Password**: Create a strong password (save this!)
5. **User Privileges**: Select "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. **IP Address**: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Your Connection String

1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. **Driver**: Node.js
4. **Version**: 5.0 or later
5. Copy the connection string

Your connection string will look like:

```
mongodb+srv://todo-user:yourpassword@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## Step 6: Update Connection String

Replace `<password>` with your actual password and add the database name:

```
mongodb+srv://todo-user:yourpassword@cluster0.xxxxx.mongodb.net/todo-app?retryWrites=true&w=majority
```

**Save this connection string - you'll need it for Render deployment!**
