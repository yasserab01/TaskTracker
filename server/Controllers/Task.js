import Task from './../Models/Task.js'
import Board from './../Models/Board.js'

export const createTask= async (req, res) => {
    try {
      const {boardId} =req.params;
      const { name, description, subtasks, status} = req.body;
      const task = new Task({ name, description, subtasks, status, boardId });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

export const getTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      const board = await Board.findById(task.boardId);
      if (!board) {
        return res.status(404).json({ success: false, message: 'Board not found' });
      }
      if (board.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
      res.json(task );
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  export const getAllTasks = async (req, res) => {
      try {
        const { boardId } = req.params;
        const tasks = await Task.find({ boardId });
        res.status(200).json( tasks );
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      }
    }

  export const updateTask= async (req, res) => {
    try {
      const { name, description, subtasks, status } = req.body;
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      const board = await Board.findById(task.boardId);
      if (!board) {
        return res.status(404).json({ success: false, message: 'Board not found' });
      }
      if (board.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
      task.name = name;
      task.description = description;
      task.subtasks = subtasks;
      task.status = status;
      await task.save();
      res.json(task);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  export const deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found' });
      }
      const board = await Board.findById(task.boardId);
      if (!board) {
        return res.status(404).json({ success: false, message: 'Board not found' });
      }
      if (board.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
      await task.deleteOne({ _id: task._id });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

