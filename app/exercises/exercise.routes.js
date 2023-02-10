import express from 'express'
import { protect } from '../auth/middleware/auth.middleware.js'
import { createNewExercise, getExercise } from './exercise.controllers.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercise)

export default router
