import mongoose from 'mongoose';

// Task schema
const taskSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    subtasks: {
      type: [mongoose.Schema.Types.Mixed],
      required: true
    },
    status: {
      type: String,
      required: true
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: true
    }
  });

const Task = mongoose.model('Task', taskSchema);

export default Task
