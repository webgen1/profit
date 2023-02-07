import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './app/auth/auth.routes.js'
import morgan from 'morgan'
import { prisma } from './app/auth/prisma.js'

dotenv.config()

const app = express()

async function main() {
  const PORT = process.env.PORT || 5000

  if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

  app.use(express.json())
  app.use('/api/auth', authRoutes)

  app.listen(
    PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on ${PORT} port.`
    )
  )
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
