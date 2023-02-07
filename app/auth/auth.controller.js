import { prisma } from './prisma.js'
import asyncHandler from 'express-async-handler'

// @desc    Auth user
// @route   Post/api/auth/login

// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const user = await prisma.user.findMany()

  res.json(user)
})

export const createUser = asyncHandler(async (req, res) => {
  const { email, name, password, images } = req.body
  const user = await prisma.user.create({
    data: { email, name, password, images }
  })

  res.json(user)
})
