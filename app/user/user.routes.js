import express from 'express'
import { getUserProfile } from './user.controllers.js'
import { protect } from '../auth/middleware/auth.middleware.js'

const router = express.Router()

router.route('/profile').get(protect, getUserProfile)

export default router
