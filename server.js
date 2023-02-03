import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './app/auth/auth.routes.js'

dotenv.config()

const app = express()

async function main() {
  const PORT = process.env.PORT || 5000

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
