// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

taskSchema.index({ user: 1, completed: 1 });
taskSchema.index({ user: 1, createdAt: -1 });

taskSchema.pre('validate', function(next) {
  if (!this.createdBy) {
    this.createdBy = this.user;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);
