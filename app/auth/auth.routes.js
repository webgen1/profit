import express from 'express'
import { authUser, createUser, registerUser } from './auth.controller.js'

const router = express.Router()

router.route('/login').post(authUser)
router.route('/user').post(createUser)
router.route('/register').post(registerUser)

export default router
