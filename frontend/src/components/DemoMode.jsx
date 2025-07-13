import React from 'react';
import './DemoMode.css';

const DemoMode = () => {
  return (
    <div className="demo-mode">
      <div className="demo-banner">
        <span className="demo-icon">🚀</span>
        <span className="demo-text">Demo Mode - Backend Not Connected</span>
      </div>
      <div className="demo-info">
        <h3>Welcome to the Todo App Demo!</h3>
        <p>This is a demonstration of the frontend interface. The backend server is not currently deployed.</p>
        <div className="demo-features">
          <h4>Features you can explore:</h4>
          <ul>
            <li>✅ Modern, responsive UI design</li>
            <li>✅ Dark/Light theme toggle</li>
            <li>✅ User authentication interface</li>
            <li>✅ Task management interface</li>
            <li>✅ Admin dashboard layout</li>
            <li>✅ Mobile-responsive design</li>
          </ul>
        </div>
        <div className="demo-next-steps">
          <h4>Next Steps:</h4>
          <ol>
            <li>Deploy the backend to Render.com</li>
            <li>Set up MongoDB Atlas database</li>
            <li>Update the API URL in the frontend</li>
            <li>Test the full application</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DemoMode; 