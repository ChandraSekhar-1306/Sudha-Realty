"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const validation_1 = require("../middleware/validation");
const validators_1 = require("../utils/validators");
const router = (0, express_1.Router)();
// Public routes
router.post('/auth', (0, validation_1.validateBody)(validators_1.createUserSchema), userController_1.UserController.getOrCreateUser);
// Protected routes
router.get('/profile', auth_1.authenticateUser, userController_1.UserController.getProfile);
router.put('/profile', auth_1.authenticateUser, userController_1.UserController.updateProfile);
router.get('/dashboard', auth_1.authenticateUser, userController_1.UserController.getDashboard);
exports.default = router;
