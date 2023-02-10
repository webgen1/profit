import { prisma } from './prisma.js'
import asyncHandler from 'express-async-handler'
import { faker } from '@faker-js/faker'
import { hash, verify } from 'argon2'
import { generateToken } from './utils/tokens/generate-token.js'
import { UserFields } from './utils/user/user-fields.js'

// @desc    Auth user
// @route   Post/api/auth/login
// @access  Public

export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      email
    }
  })

  const isValidPassword = await verify(user.password, password)

  if (!isValidPassword) {
    res.status(401)
    throw new Error('Не верно указан пароль или логин')
  }

  res.json(user)
})

// @desc    Register user
// @route   Post/api/auth/register
// @access Public

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const isHaveUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (isHaveUser) {
    res.status(400)
    throw new Error('Пользователь с таким Email уже существует')
  }

  const user = await prisma.user.create({
    data: {
      email,
      password: await hash(password),
      name: faker.name.fullName()
    },
    select: UserFields
  })

  const token = generateToken(user.id)

  res.json({ user, token })
})
