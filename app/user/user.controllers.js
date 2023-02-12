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

  res.json(user)
})
