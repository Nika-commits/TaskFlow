# Todo Application

A modern, full-stack todo application built with React, Express.js, and MongoDB following MVC architecture.

## Features

- ✅ User authentication (register/login)
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks (All, Active, Completed)
- ✅ Progress tracking with visual progress bar
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Real-time task statistics
- ✅ Double-click to edit tasks
- ✅ Clear completed tasks functionality

## Tech Stack

### Frontend

- **React 19** - Modern React with hooks
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with CSS variables for theming

### Backend

- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## Project Structure

```
todo/
├── backend/
│   ├── config/
│   │   └── db.js              # Database configuration
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   └── taskController.js   # Task CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   ├── models/
│   │   ├── userModel.js        # User schema
│   │   └── taskModel.js        # Task schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   └── tasks.js            # Task routes
│   └── server.js               # Express server
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # API configuration
│   │   ├── components/
│   │   │   ├── FilterBar.jsx   # Task filtering component
│   │   │   ├── ProgressBar.jsx # Progress tracking component
│   │   │   ├── TaskInput.jsx   # Task input form
│   │   │   ├── TaskItem.jsx    # Individual task component
│   │   │   └── ThemeToggle.jsx # Theme toggle component
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Authentication context
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx   # Main todo dashboard
│   │   │   ├── Login.jsx       # Login page
│   │   │   └── Register.jsx    # Registration page
│   │   ├── App.js              # Main app component
│   │   └── index.css           # Global styles
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd todo
   ```

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the backend directory:

   ```env
   MONGO_URI=mongodb://localhost:27017/todo-app
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

5. **Start the backend server**

   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   cd frontend
   npm start
   ```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/theme` - Update user theme (protected)

### Tasks

- `GET /api/tasks` - Get all tasks for user (protected)
- `POST /api/tasks` - Create a new task (protected)
- `PUT /api/tasks/:id` - Update a task (protected)
- `DELETE /api/tasks/:id` - Delete a task (protected)
- `DELETE /api/tasks/clear-completed` - Clear completed tasks (protected)
- `GET /api/tasks/stats` - Get task statistics (protected)

## Features in Detail

### Authentication

- Secure user registration and login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes with middleware

### Task Management

- Create tasks with text input
- Mark tasks as complete/incomplete
- Edit tasks by double-clicking
- Delete individual tasks
- Clear all completed tasks
- Filter tasks by status

### User Experience

- Responsive design for mobile and desktop
- Dark/Light theme toggle
- Progress bar showing completion rate
- Real-time task statistics
- Smooth animations and transitions
- Error handling and validation

### Data Persistence

- MongoDB database with Mongoose ODM
- User data with authentication
- Task data with user relationships
- Theme preferences stored per user

## Development

### Backend Development

```bash
cd backend
npm run dev  # Start with nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm start    # Start React development server
```

### Database

The application uses MongoDB. Make sure MongoDB is running locally or update the `MONGO_URI` in your `.env` file to point to your MongoDB instance.

## Deployment

### Backend Deployment

1. Set up environment variables on your hosting platform
2. Deploy to platforms like Heroku, Railway, or DigitalOcean
3. Ensure MongoDB connection string is properly configured

### Frontend Deployment

1. Build the React app: `npm run build`
2. Deploy the `build` folder to platforms like Netlify, Vercel, or GitHub Pages
3. Update API base URL in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- The open-source community for various tools and libraries
