import { prisma } from '../prisma.js'
import asyncHandler from 'express-async-handler'

// @desc    Get workout
// @route   Get/api/workout
// @access  Private
export const getWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params

  const workout = await prisma.workout.findUnique({
    where: {
      id: Number(id)
    },
    include: {
      exercises: true
    }
    // exercises: {
    //   connect: exerciseIds.map((id) => ({ id: +id }))
    // }
  })

  if (!workout) {
    res.status(404)
    throw new Error('Тренировка не найдена!')
  }

  const minutes = Math.ceil(workout.exercises.length * 3.7)

  res.json({ ...workout, minutes })
})

// @desc    Get workouts
// @route   Get/api/workouts
// @access  Private
export const getWorkouts = asyncHandler(async (req, res) => {
  const workouts = await prisma.workout.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      exercises: true
    }
  })

  res.json(workouts)
})

// @desc    Create nex workout
// @route   Post/api/workouts
// @access  Private
export const createWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body

  const workout = await prisma.workout.create({
    data: {
      name,
      exercises: {
        connect: exerciseIds.map((id) => ({ id: +id }))
      }
    }
  })

  res.json(workout)
})

// @desc Update workout
// @route Put/api/workouts/:id
// @access Private
export const updateWorkout = asyncHandler(async (req, res) => {
  const { name, exerciseIds } = req.body
  const { id } = req.params

  try {
    const workout = await prisma.workout.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        exercises: {
          set: exerciseIds.map((id) => ({ id: +id }))
          // connect: exerciseIds.map((id) => ({ id: +id }))
        }
      }
    })

    res.json(workout)
  } catch (error) {
    res.status(404)
    throw new Error('Тренировка не найдена!')
  }
})

// @desc Delete workout
// @route DELETE/api/workouts/:id
// @access Private
export const deleteWorkout = asyncHandler(async (req, res) => {
  const { id } = req.params

  try {
    const workout = await prisma.workout.delete({
      where: {
        id: Number(id)
      }
    })

    res.json({ message: 'Тренировка удалена!' })
  } catch (error) {
    res.status(404)
    throw new Error('Тренировка не найдена!')
  }
})
