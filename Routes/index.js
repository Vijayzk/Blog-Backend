import { Router } from "express"; 
import UserRoutes from './userRoutes.js'
import PostRoutes from './postRoutes.js'

const router = Router()

router.use('/api/user',UserRoutes)
router.use('/api/post',PostRoutes)

export default router;