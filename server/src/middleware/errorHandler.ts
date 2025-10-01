import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { config } from '../config/env';
import { sendError } from '../utils/responses';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error occurred:', {
    message: error.message,
    stack: config.nodeEnv === 'development' ? error.stack : undefined,
    url: req.originalUrl,
    method: req.method,
  });

  // Prisma errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return sendError(res, 'A record with this data already exists', 409);
      case 'P2025':
        return sendError(res, 'Record not found', 404);
      case 'P2003':
        return sendError(res, 'Foreign key constraint violation', 400);
      case 'P2014':
        return sendError(res, 'Invalid ID provided', 400);
      default:
        return sendError(res, 'Database operation failed', 500);
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return sendError(res, 'Invalid data provided', 400);
  }

  // JWT errors are handled in auth middleware
  
  // Multer errors (file upload)
  if (error.code === 'LIMIT_FILE_SIZE') {
    return sendError(res, 'File too large', 413);
  }

  if (error.code === 'LIMIT_FILE_COUNT') {
    return sendError(res, 'Too many files', 413);
  }

  if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return sendError(res, 'Unexpected file field', 400);
  }

  // Default error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  
  return sendError(
    res, 
    message, 
    statusCode,
    config.nodeEnv === 'development' ? error.stack : undefined
  );
};

export const notFoundHandler = (req: Request, res: Response) => {
  return sendError(res, `Route ${req.originalUrl} not found`, 404);
};