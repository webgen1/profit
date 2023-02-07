import express from 'express'
import { authUser, createUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').get(authUser)
router.route('/user').post(createUser)

export default router
