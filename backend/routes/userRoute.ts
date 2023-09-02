import { Router } from 'express'
import { findById } from '../controllers/userController'
const router = Router()
router.get('/login', findById)

export default router

