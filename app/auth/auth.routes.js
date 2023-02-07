import express from 'express'
import { authUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').get(authUser)

export default router
