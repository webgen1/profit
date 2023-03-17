import { prisma } from '../prisma.js'
import { UserFields } from '../auth/utils/user/user-fields.js'
import asyncHandler from 'express-async-handler'

// @desc    Get user profile
// @route   Get/api/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id
    },
    select: UserFields
  })

  const kgs = await prisma.exerciseTime.aggregate({
    where: {
      exerciseLog: {
        userId: req.user.id
      },
      isCompleted: true
    },
    _sum: {
      weight: true
    }
  })

  const workouts = await prisma.workoutLog.count({
    where: {
      userId: user.id,
      isCompleted: true
    }
  })

  const countExerciseTimesCompleted = await prisma.exerciseLog.count({
    where: {
      userId: req.user.id,
      isCompleted: true
    }
  })

  res.json({
    ...user,
    statistics: [
      {
        label: 'Minutes',
        value: Math.ceil(countExerciseTimesCompleted * 2.3) || 0
      },
      {
        label: 'Workouts',
        value: workouts
      },
      {
        label: 'Kgs',
        value: kgs._sum.weight || 0
      }
    ]
  })
})
