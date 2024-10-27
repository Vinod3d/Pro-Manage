import express from 'express'
import { addMember, getAllUsers, getUser, login, logout, register, updateUser } from '../controller/userController.js'
import auth from '../middleware/auth.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', auth, logout);
router.get('/', getAllUsers);
router.get('/:userId', auth, getUser);
router.patch('/addmember', auth, addMember)
router.patch('/update', auth, updateUser)

export default router;