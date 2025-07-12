const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  clearCompletedTasks,
  getTaskStats,
} = require('../controllers/taskController');

// All routes are protected
router.use(protect);

// Special routes (must come before /:id routes)
router.delete('/clear-completed', clearCompletedTasks);
router.get('/stats', getTaskStats);

// Task routes
router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;

// Admin routes
const adminRouter = express.Router();
const { isAdmin } = require('../middleware/authMiddleware');
const { listUsers, adminAssignTask, adminTasks, adminUpdateTask, adminDeleteTask } = require('../controllers/adminController');

adminRouter.use(protect, isAdmin);
adminRouter.get('/users', listUsers);
adminRouter.post('/tasks', adminAssignTask);
adminRouter.get('/tasks', adminTasks);
adminRouter.put('/tasks/:id', adminUpdateTask);
adminRouter.delete('/tasks/:id', adminDeleteTask);

module.exports.adminRouter = adminRouter;
