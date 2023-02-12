import { prisma } from '../../prisma.js'
import asyncHandler from 'express-async-handler'
import { validateToken } from '../utils/tokens/validate-token.js'
import { UserFields } from '../utils/user/user-fields.js'

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]

    const decoded = await validateToken(token)

    if (!decoded) {
      res.status(401)
      throw new Error('Не авторизован, токен не валидный')
    }

    const userFound = await prisma.user.findUnique({
      where: {
        id: decoded.userId
      },
      select: UserFields
    })

    if (userFound) {
      req.user = userFound
      next()
    } else {
      res.status(401)
      throw new Error('Не авторизован, пользователь не найден')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Не авторизован, токен не пришел')
  }
})
