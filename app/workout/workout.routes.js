import express from 'express'
import { protect } from '../auth/middleware/auth.middleware.js'
import {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout
} from './workout.controllers.js'

const router = express.Router()

router.route('/').post(protect, createWorkout).get(protect, getWorkouts)

router
  .route('/:id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout)

export default router
