import express from 'express'
import { protect } from '../auth/middleware/auth.middleware.js'
import {
  createWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout
} from './workout.controllers.js'
import { createNewWorkoutLog } from './Log/workout-log-controller.js'
import { updateCompleteWorkoutLog } from './Log/update-workout-log.controller.js'
import { getWorkoutLog } from './Log/get-workout-log.controller.js'

const router = express.Router()

router.route('/').post(protect, createWorkout).get(protect, getWorkouts)

router
  .route('/:id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout)

router
  .route('/log/:id')
  .post(protect, createNewWorkoutLog)
  .get(protect, getWorkoutLog)

router.route('/log/complete/:id').patch(protect, updateCompleteWorkoutLog)

export default router
