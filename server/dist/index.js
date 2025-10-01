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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const cors_2 = require("./config/cors");
const database_1 = require("./config/database");
const errorHandler_1 = require("./middleware/errorHandler");
// Import routes
const users_1 = __importDefault(require("./routes/users"));
const appointments_1 = __importDefault(require("./routes/appointments"));
const properties_1 = __importDefault(require("./routes/properties"));
const inquiries_1 = __importDefault(require("./routes/inquiries"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
// Security middleware
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// CORS
app.use((0, cors_1.default)(cors_2.corsOptions));
// Body parsing middleware
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Health check endpoint
app.get('/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test database connection
        yield database_1.prisma.$queryRaw `SELECT 1`;
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: env_1.config.nodeEnv,
            database: 'Connected',
        });
    }
    catch (error) {
        res.status(503).json({
            status: 'Error',
            timestamp: new Date().toISOString(),
            database: 'Disconnected',
            error: 'Database connection failed',
        });
    }
}));
// API routes
app.use('/api/users', users_1.default);
app.use('/api/appointments', appointments_1.default);
app.use('/api/properties', properties_1.default);
app.use('/api/inquiries', inquiries_1.default);
app.use('/api/admin', admin_1.default);
// Welcome route
app.get('/', (req, res) => {
    res.json({
        message: 'Real Estate Consultation & Property Listing API',
        version: '1.0.0',
        documentation: '/api/docs', // You can add API docs later
        health: '/health',
    });
});
// Error handling middleware (must be last)
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Start server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Test database connection
        yield database_1.prisma.$connect();
        console.log('✅ Database connected successfully');
        // Start server
        const server = app.listen(env_1.config.port, () => {
            console.log(` Server running on port ${env_1.config.port}`);
            console.log(` Environment: ${env_1.config.nodeEnv}`);
            console.log(` Health check: http://localhost:${env_1.config.port}/health`);
        });
        // Graceful shutdown
        const gracefulShutdown = (signal) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`\n${signal} received. Starting graceful shutdown...`);
            server.close(() => __awaiter(void 0, void 0, void 0, function* () {
                console.log('HTTP server closed');
                try {
                    yield database_1.prisma.$disconnect();
                    console.log('Database connection closed');
                    console.log('Graceful shutdown completed');
                    process.exit(0);
                }
                catch (error) {
                    console.error('Error during shutdown:', error);
                    process.exit(1);
                }
            }));
            // Force shutdown after 30 seconds
            setTimeout(() => {
                console.error('Forced shutdown due to timeout');
                process.exit(1);
            }, 30000);
        });
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    }
    catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
});
// Handle unhandled rejections and exceptions
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});
startServer();
exports.default = app;
