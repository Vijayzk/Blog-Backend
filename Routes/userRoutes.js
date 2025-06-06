import express from 'express';
import multer from 'multer';
import { createUser, getAllUser, loginUser } from '../Controller/userController.js';
import {authenticateToken} from '../middlewares/authenticate.js'

const router = express.Router();

var uploader = multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:'2mb'}
})

router.post('/',uploader.single('file'),createUser)
router.post('/login',loginUser)
router.get('/alluser',authenticateToken,getAllUser)


export default router
