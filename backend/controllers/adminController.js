const User = require('../models/userModel');
const Task = require('../models/taskModel');

// List all users (for admin to assign tasks)
const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, '_id username email');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin assigns a task to multiple users
const adminAssignTask = async (req, res) => {
  try {
    const { text, assignedTo, priority = 'medium', dueDate } = req.body;
    if (!text || !assignedTo || !Array.isArray(assignedTo) || assignedTo.length === 0) {
      return res.status(400).json({ message: 'Task text and assignedTo users are required' });
    }
    const tasks = await Promise.all(
      assignedTo.map(userId =>
        Task.create({
          text,
          priority,
          dueDate: dueDate || null,
          user: userId,
          createdBy: req.user._id,
          assignedTo: [userId],
        })
      )
    );
    res.status(201).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all tasks assigned by this admin
const adminTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).populate('user', 'username email');
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task assigned by admin
const adminUpdateTask = async (req, res) => {
  try {
    const { text, completed, priority, dueDate } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        text: text || task.text,
        completed: completed !== undefined ? completed : task.completed,
        priority: priority || task.priority,
        dueDate: dueDate !== undefined ? dueDate : task.dueDate,
      },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task assigned by admin
const adminDeleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  listUsers,
  adminAssignTask,
  adminTasks,
  adminUpdateTask,
  adminDeleteTask,
}; 