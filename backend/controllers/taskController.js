const Task = require('../models/taskModel');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { filter = 'all' } = req.query;
    let query = { user: req.user._id };

    // Apply filters
    if (filter === 'active') {
      query.completed = false;
    } else if (filter === 'completed') {
      query.completed = true;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { text, priority = 'medium', dueDate } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Task text is required' });
    }

    const task = await Task.create({
      text: text.trim(),
      priority,
      dueDate: dueDate || null,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { text, completed, priority, dueDate } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
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

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if task belongs to user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Clear all tasks
// @route   DELETE /api/tasks/clear-completed
// @access  Private
const clearCompletedTasks = async (req, res) => {
  try {
    await Task.deleteMany({ user: req.user._id });
    res.json({ message: 'All tasks cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get task statistics
// @route   GET /api/tasks/stats
// @access  Private
const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user._id });
    const completedTasks = await Task.countDocuments({ 
      user: req.user._id, 
      completed: true 
    });
    const activeTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    res.json({
      total: totalTasks,
      completed: completedTasks,
      active: activeTasks,
      completionRate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
  getTaskStats,
}; 