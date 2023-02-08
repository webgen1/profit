import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma.js'
import { UserFields } from '../user.utils.js/user.utils.js'

const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (e) {
    return null
  }
}
export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]

    // console.log(token)
    const decoded = await validateToken(token)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // const decoded = jwt.verify(token, process.env.JWT_SECRET, (err) => {
    //   if (err) {
    //     res.status(401)
    //     throw new Error('Не авторизован, токен на валидный')
    //   }
    // })
    // console.log(decoded)

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
