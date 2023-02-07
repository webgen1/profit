import { prisma } from './prisma.js'
import asyncHandler from 'express-async-handler'

// @desc    Auth user
// @route   Post/api/auth/login

// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findMany()

  res.json(user)
})
