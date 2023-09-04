import { Router } from 'express'
import { getRoomMessages } from '../controllers/messageController'
const router = Router()
router.get('/room/:roomId', getRoomMessages)

export default router

