const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/userModel');
const tasksRouter = require('./routes/tasks');
const { adminRouter } = require('./routes/tasks');

// Load environment variables
dotenv.config();

const app = express();

// Connect to database
connectDB();

async function seedAdmins() {
  const admins = [
    { username: 'pranish', email: 'pranish@gmail.com', password: 'admin123', role: 'admin' },
    { username: 'admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  ];
  for (const admin of admins) {
    const exists = await User.findOne({ email: admin.email });
    if (!exists) {
      await User.create(admin);
      console.log(`Seeded admin: ${admin.email}`);
    } else {
      // Always reset password and role
      exists.password = admin.password;
      exists.role = 'admin';
      await exists.save();
      console.log(`Reset admin: ${admin.email}`);
    }
  }
}

seedAdmins();

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://nika-commits.github.io'] // Your GitHub Pages URL
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', tasksRouter);
app.use('/api/admin', adminRouter);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Todo API is running' });
});

// Health check endpoint for deployment platforms
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
