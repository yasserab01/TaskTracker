import  express  from "express";
import verifyToken from "./../Middelwares/verifyToken.js"
import {createBoard, getAllBoards, getBoard,  updateBoard, deleteBoard} from "./../Controllers/Board.js"

// Boards
const router = express.Router();

//all
router.get('/', verifyToken, getAllBoards) 
//show
router.get('/:id', verifyToken, getBoard);
//save
router.post('/', verifyToken, createBoard);
//update
router.put('/:id', verifyToken, updateBoard);
//delete
router.delete('/:id', verifyToken, deleteBoard);

export default router;
  