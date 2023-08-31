import { Router } from 'express'
import { joinRoom } from '../controllers/roomController'
const router = Router()
router.post("/join", joinRoom);

export default router

