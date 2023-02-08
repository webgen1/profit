import { prisma } from './prisma.js'
import { UserFields } from '../auth/user.utils.js/user.utils.js'
import asyncHandler from 'express-async-handler'

// @desc    Get user profile
// @route   Get/api/users/profile
// @access  Private

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: 1
    },
    select: UserFields
  })

  res.json(user)
})
