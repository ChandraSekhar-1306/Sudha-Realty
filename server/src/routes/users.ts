import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authenticateUser } from '../middleware/auth';
import { validateBody } from '../middleware/validation';
import { createUserSchema } from '../utils/validators';

const router = Router();

// Public routes
router.post('/auth', validateBody(createUserSchema), UserController.getOrCreateUser);

// Protected routes
router.get('/profile', authenticateUser, UserController.getProfile);
router.put('/profile', authenticateUser, UserController.updateProfile);
router.get('/dashboard', authenticateUser, UserController.getDashboard);

export default router;