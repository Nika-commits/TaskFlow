#!/bin/bash

echo "🚀 Backend Deployment Preparation"
echo "================================"

echo ""
echo "📋 Prerequisites Checklist:"
echo "1. ✅ MongoDB Atlas account created"
echo "2. ✅ Database cluster set up"
echo "3. ✅ Database user created"
echo "4. ✅ Network access configured"
echo "5. ✅ Connection string obtained"
echo "6. ✅ Render.com account created"
echo ""

read -p "Have you completed the MongoDB Atlas setup? (y/n): " atlas_ready

if [ "$atlas_ready" != "y" ]; then
    echo ""
    echo "📖 Please follow the MongoDB Atlas setup guide first:"
    echo "   See: MONGODB_SETUP.md"
    exit 1
fi

echo ""
read -p "Have you created your Render.com account? (y/n): " render_ready

if [ "$render_ready" != "y" ]; then
    echo ""
    echo "📖 Please create your Render.com account first:"
    echo "   Go to: https://render.com"
    exit 1
fi

echo ""
echo "🎯 Ready to deploy backend!"
echo ""
echo "📝 Next Steps:"
echo "1. Follow the Render deployment guide: RENDER_DEPLOYMENT.md"
echo "2. Set up your MongoDB Atlas database"
echo "3. Deploy to Render.com"
echo "4. Get your backend URL"
echo "5. Update frontend with the backend URL"
echo ""
echo "📚 Guides available:"
echo "   - MONGODB_SETUP.md (Database setup)"
echo "   - RENDER_DEPLOYMENT.md (Backend deployment)"
echo "   - DEPLOYMENT_GUIDE.md (Complete guide)"
echo ""
echo "🚀 Happy deploying!" 