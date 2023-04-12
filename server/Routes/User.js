import  express  from "express";
import {login, register} from "./../Controllers/User.js"

const router = express.Router();
router.post('/login',login)
router.post('/register',register)

export default router;