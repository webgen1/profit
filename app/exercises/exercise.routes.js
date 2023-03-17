import express from 'express'
import { protect } from '../auth/middleware/auth.middleware.js'
import {
  createNewExercise,
  getExercise,
  updateExercise,
  deleteExercise
} from './exercise.controllers.js'
import { createNewExerciseLog } from './log/exercise-log-controller.js'
import { getExerciseLog } from './log/get-exercise-log.controller.js'
import {
  updateExerciseLogTime,
  completeExerciseLog
} from './log/update-exercise-log.controller.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercise)

router
  .route('/:id')
  .put(protect, updateExercise)
  .delete(protect, deleteExercise)

router
  .route('/log/:id')
  .post(protect, createNewExerciseLog)
  .get(protect, getExerciseLog)

router.route('/log/time/:id').put(protect, updateExerciseLogTime)
router.route('/log/complete/:id').patch(protect, completeExerciseLog)

export default router
