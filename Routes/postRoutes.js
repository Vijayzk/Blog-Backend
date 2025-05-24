import express from 'express';
import multer from 'multer';
import {authenticateToken} from '../middlewares/authenticate.js';
import { createPost, deletePost, getAllPost, getByUserId, getPostById, searchByName, updatePost } from '../Controller/postController.js';


const router = express.Router();

var uploader = multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:'2mb'}
})

router.post('/',[authenticateToken,uploader.single('file')],createPost)
router.get('/',authenticateToken,getAllPost)
router.get('/:id',authenticateToken,getPostById)
router.get('/getByUserId/:id',authenticateToken,getByUserId)
router.post('/search',authenticateToken,searchByName)
router.post('/update/:id',authenticateToken,updatePost)
router.delete('/:id',authenticateToken,deletePost)

export default router;
