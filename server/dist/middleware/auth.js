"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.optionalAuth = exports.authenticateAdmin = exports.authenticateUser = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const database_1 = require("../config/database");
const responses_1 = require("../utils/responses");
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            return (0, responses_1.sendUnauthorized)(res, 'Access token is required');
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.secret);
        if (decoded.type === 'user') {
            const user = yield database_1.prisma.user.findUnique({
                where: { id: decoded.id }
            });
            if (!user) {
                return (0, responses_1.sendUnauthorized)(res, 'User not found');
            }
            req.user = user;
        }
        else if (decoded.type === 'admin') {
            const admin = yield database_1.prisma.admin.findUnique({
                where: { id: decoded.id }
            });
            if (!admin) {
                return (0, responses_1.sendUnauthorized)(res, 'Admin not found');
            }
            req.admin = admin;
        }
        else {
            return (0, responses_1.sendUnauthorized)(res, 'Invalid token type');
        }
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return (0, responses_1.sendUnauthorized)(res, 'Token has expired');
        }
        else if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return (0, responses_1.sendUnauthorized)(res, 'Invalid token');
        }
        return (0, responses_1.sendUnauthorized)(res, 'Token verification failed');
    }
});
exports.authenticateToken = authenticateToken;
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.authenticateToken)(req, res, () => {
        if (!req.user) {
            return (0, responses_1.sendForbidden)(res, 'User access required');
        }
        next();
    });
});
exports.authenticateUser = authenticateUser;
const authenticateAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.authenticateToken)(req, res, () => {
        if (!req.admin) {
            return (0, responses_1.sendForbidden)(res, 'Admin access required');
        }
        next();
    });
});
exports.authenticateAdmin = authenticateAdmin;
const optionalAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwt.secret);
            if (decoded.type === 'user') {
                const user = yield database_1.prisma.user.findUnique({
                    where: { id: decoded.id }
                });
                req.user = user || undefined;
            }
            else if (decoded.type === 'admin') {
                const admin = yield database_1.prisma.admin.findUnique({
                    where: { id: decoded.id }
                });
                req.admin = admin || undefined;
            }
        }
    }
    catch (error) {
        // Ignore authentication errors for optional auth
        console.log('Optional auth failed:', error instanceof Error ? error.message : 'Unknown error');
    }
    next();
});
exports.optionalAuth = optionalAuth;
const generateToken = (id, email, type) => {
    const payload = { id, email, type };
    return jsonwebtoken_1.default.sign(payload, env_1.config.jwt.secret, { expiresIn: env_1.config.jwt.expiresIn });
};
exports.generateToken = generateToken;
