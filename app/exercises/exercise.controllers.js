import { prisma } from './prisma.js'
import asyncHandler from 'express-async-handler'

// @desc    Create nex exercise
// @route   Post/api/create-exercise
// @access  Private
export const createNewExercise = asyncHandler(async (req, res) => {
  const { name, times, iconPath } = req.body

  const exercise = await prisma.exercise.create({
    data: {
      name,
      times,
      iconPath
    }
  })

  res.json(exercise)
})

// @desc    Get exercise
// @route   Get/api/exercise
// @access  Private
export const getExercise = asyncHandler(async (req, res) => {
  const exercise = await prisma.exercise.findMany()

  res.json(exercise)
})
