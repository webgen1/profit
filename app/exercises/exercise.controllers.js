import { prisma } from '../prisma.js'
import asyncHandler from 'express-async-handler'

// @desc    Get exercises
// @route   Get/api/exercises
// @access  Private
export const getExercise = asyncHandler(async (req, res) => {
  const exercises = await prisma.exercise.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  res.json(exercises)
})

// @desc    Create nex exercise
// @route   Post/api/exercises
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

// @desc Update exercise
// @route Put/api/exercises/:id
// @access Private
export const updateExercise = asyncHandler(async (req, res) => {
  const { name, times, iconPath } = req.body
  const { id } = req.params

  try {
    const exercise = await prisma.exercise.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        times,
        iconPath
      }
    })

    res.json(exercise)
  } catch (error) {
    res.status(404)
    throw new Error('Упражнение не найдено')
  }
})

// @desc Delete exercise
// @route DELETE/api/exercises/:id
// @access Private
export const deleteExercise = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const exercise = await prisma.exercise.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({ message: 'Упражнение удалено!' })
  } catch (error) {
    res.status(404)
    throw new Error('Упражнение не найдено!')
  }
})
