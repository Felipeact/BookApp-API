import { Router } from "express";
import authMiddleware from '../middlewares/AuthMiddleware';

import UserController from '../controllers/UserController'
import AuthController from '../controllers/AuthController'

const router = Router()

router.post('/users', UserController.create)
router.put('/users',authMiddleware, UserController.update)
router.get('/users/:id',authMiddleware, UserController.show)
router.delete('/users',authMiddleware, UserController.delete)
router.get('/users',authMiddleware, UserController.index)

router.post('/auth', AuthController.authenticate)
export default router;