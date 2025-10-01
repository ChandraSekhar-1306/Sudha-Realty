import { Router } from 'express';
import { PropertyController } from '../controllers/propertyController';
import { authenticateUser, optionalAuth } from '../middleware/auth';
import { validateQuery, validateParams } from '../middleware/validation';
import { propertyFiltersSchema, uuidSchema, paginationSchema } from '../utils/validators';
import Joi from 'joi';

const router = Router();

// Public routes (with optional auth for favorites)
router.get('/', optionalAuth, validateQuery(propertyFiltersSchema), PropertyController.getProperties);
router.get('/search', optionalAuth, PropertyController.searchProperties);
router.get('/:id', optionalAuth, validateParams(Joi.object({ id: uuidSchema })), PropertyController.getProperty);

// Protected routes
router.post('/:id/favorite', authenticateUser, validateParams(Joi.object({ id: uuidSchema })), PropertyController.toggleFavorite);
router.get('/user/favorites', authenticateUser, validateQuery(paginationSchema), PropertyController.getUserFavorites);

export default router;