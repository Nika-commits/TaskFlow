#!/bin/bash

echo "🚀 Todo App Deployment Script"
echo "=============================="

# Check if we're in the right directory
if [ ! -d "frontend" ] || [ ! -d "backend" ]; then
    echo "❌ Error: Please run this script from the root directory of your todo project"
    exit 1
fi

echo "📋 Prerequisites Check:"
echo "1. Make sure you have:"
echo "   - GitHub account"
echo "   - Render.com account"
echo "   - MongoDB Atlas account"
echo "2. Update the following files with your actual URLs:"
echo "   - frontend/package.json (homepage field)"
echo "   - frontend/env.production (API URL)"
echo "   - backend/server.js (CORS origins)"
echo ""

read -p "Have you set up MongoDB Atlas and got your connection string? (y/n): " atlas_ready

if [ "$atlas_ready" != "y" ]; then
    echo "📖 Please follow the MongoDB Atlas setup in DEPLOYMENT_GUIDE.md first"
    exit 1
fi

echo ""
echo "🔧 Building and deploying frontend to GitHub Pages..."

# Build the frontend
cd frontend
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
    
    # Deploy to GitHub Pages
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "✅ Frontend deployed to GitHub Pages"
        echo "🌐 Your app should be available at: https://your-username.github.io/todo"
    else
        echo "❌ Frontend deployment failed"
        exit 1
    fi
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

echo ""
echo "🎉 Deployment Steps Completed!"
echo ""
echo "📝 Next Steps:"
echo "1. Deploy backend to Render.com (follow DEPLOYMENT_GUIDE.md)"
echo "2. Update environment variables in Render dashboard"
echo "3. Test your live application"
echo "4. Update your portfolio with the live URLs"
echo ""
echo "📚 For detailed instructions, see: DEPLOYMENT_GUIDE.md" 