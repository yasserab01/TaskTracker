import  express  from "express";
import verifyToken from "./../Middelwares/verifyToken.js"
import {createTask, getAllTasks, getTask,  updateTask, deleteTask} from "./../Controllers/Task.js"

// Tasks
const router = express.Router();

//all
router.get('/boards/:boardId/tasks', verifyToken, getAllTasks) 
//show
router.get('/boards/:boardId/tasks/:id', verifyToken, getTask);
//save
router.post('/boards/:boardId/tasks', verifyToken, createTask);
//update
router.put('/boards/:boardId/tasks/:id', verifyToken, updateTask);
//delete
router.delete('/boards/:boardId/tasks/:id', verifyToken, deleteTask);

export default router;