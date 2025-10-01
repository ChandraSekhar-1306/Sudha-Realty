"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const client_1 = require("@prisma/client");
const env_1 = require("../config/env");
const responses_1 = require("../utils/responses");
const errorHandler = (error, req, res, next) => {
    console.error('Error occurred:', {
        message: error.message,
        stack: env_1.config.nodeEnv === 'development' ? error.stack : undefined,
        url: req.originalUrl,
        method: req.method,
    });
    // Prisma errors
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                return (0, responses_1.sendError)(res, 'A record with this data already exists', 409);
            case 'P2025':
                return (0, responses_1.sendError)(res, 'Record not found', 404);
            case 'P2003':
                return (0, responses_1.sendError)(res, 'Foreign key constraint violation', 400);
            case 'P2014':
                return (0, responses_1.sendError)(res, 'Invalid ID provided', 400);
            default:
                return (0, responses_1.sendError)(res, 'Database operation failed', 500);
        }
    }
    if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        return (0, responses_1.sendError)(res, 'Invalid data provided', 400);
    }
    // JWT errors are handled in auth middleware
    // Multer errors (file upload)
    if (error.code === 'LIMIT_FILE_SIZE') {
        return (0, responses_1.sendError)(res, 'File too large', 413);
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
        return (0, responses_1.sendError)(res, 'Too many files', 413);
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
        return (0, responses_1.sendError)(res, 'Unexpected file field', 400);
    }
    // Default error
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';
    return (0, responses_1.sendError)(res, message, statusCode, env_1.config.nodeEnv === 'development' ? error.stack : undefined);
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    return (0, responses_1.sendError)(res, `Route ${req.originalUrl} not found`, 404);
};
exports.notFoundHandler = notFoundHandler;
