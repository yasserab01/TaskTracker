import mongoose from 'mongoose';

// Board schema
const boardSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    columns: {
      type: [String],
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });

const Board = mongoose.model('Board', boardSchema);

export default Board
