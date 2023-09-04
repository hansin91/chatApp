import { Router } from 'express'
import { joinRoom, findById, leaveRoom } from '../controllers/roomController'
const router = Router()
router.post('/join', joinRoom)
router.post('/leave', leaveRoom)
router.get('/:id', findById)

export default router

