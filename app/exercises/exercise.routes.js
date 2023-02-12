import express from 'express'
import { protect } from '../auth/middleware/auth.middleware.js'
import {
  createNewExercise,
  getExercise,
  updateExercise,
  deleteExercise
} from './exercise.controllers.js'

const router = express.Router()

router.route('/').post(protect, createNewExercise).get(protect, getExercise)

router
  .route('/:id')
  .put(protect, updateExercise)
  .delete(protect, deleteExercise)

export default router
