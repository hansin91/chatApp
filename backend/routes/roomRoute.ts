import { Router } from 'express'
import { joinRoom, findById } from '../controllers/roomController'
const router = Router()
router.post("/join", joinRoom)
router.get('/:id', findById)

export default router

