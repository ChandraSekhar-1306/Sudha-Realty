"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const propertyController_1 = require("../controllers/propertyController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const validators_1 = require("../utils/validators");
const joi_1 = __importDefault(require("joi"));
const router = (0, express_1.Router)();
// Public routes (with optional auth for favorites)
router.get('/', auth_1.optionalAuth, (0, validation_1.validateQuery)(validators_1.propertyFiltersSchema), propertyController_1.PropertyController.getProperties);
router.get('/search', auth_1.optionalAuth, propertyController_1.PropertyController.searchProperties);
router.get('/:id', auth_1.optionalAuth, (0, validation_1.validateParams)(joi_1.default.object({ id: validators_1.uuidSchema })), propertyController_1.PropertyController.getProperty);
// Protected routes
router.post('/:id/favorite', auth_1.authenticateUser, (0, validation_1.validateParams)(joi_1.default.object({ id: validators_1.uuidSchema })), propertyController_1.PropertyController.toggleFavorite);
router.get('/user/favorites', auth_1.authenticateUser, (0, validation_1.validateQuery)(validators_1.paginationSchema), propertyController_1.PropertyController.getUserFavorites);
exports.default = router;
