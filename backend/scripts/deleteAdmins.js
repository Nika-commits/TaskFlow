const mongoose = require('mongoose');
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app');
  const result = await User.deleteMany({ email: { $in: ['pranish@gmail.com', 'admin@gmail.com'] } });
  console.log('Deleted admin users:', result.deletedCount);
  await mongoose.disconnect();
}

run(); 