import Board from './../Models/Board.js'

// Boards controller
export const createBoard= async (req, res) => {
    try {
      const { name, columns } = req.body;
      const board = new Board({ name, columns, owner: req.user._id });
      await board.save();
      res.status(201).json({ success: true, board });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  export const getBoard= async (req, res) => {
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ success: false, message: 'Board not found' });
      }
      if (board.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
      res.json( board );
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  export const getAllBoards= async (req, res) => {
    try {
      const owner = req.user._id;
      const boards = await Board.find({ owner });
      res.status(200).json( boards );
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }

  export const updateBoard= async (req, res) => {
    try {
      const { name, columns } = req.body;
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ success: false, message: 'Board not found' });
      }
      if (board.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
      board.name = name;
      board.columns = columns;
      await board.save();
      res.json(board);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }

  export const deleteBoard= async (req, res) => {
    try {
      const board = await Board.findById(req.params.id);
      if (!board) {
        return res.status(404).json({ success: false, message: 'Board not found' });
      }
      if (board.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Unauthorized' });
      }
      await board.deleteOne({ _id: board._id });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }


