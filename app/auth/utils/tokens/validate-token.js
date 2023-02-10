import jwt from 'jsonwebtoken'

export const validateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    return decoded
  } catch (e) {
    return null
  }
}
