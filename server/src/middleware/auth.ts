import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { prisma } from '../config/database';
import { AuthenticatedRequest } from '../types';
import { sendUnauthorized, sendForbidden } from '../utils/responses';

interface JWTPayload {
  id: string;
  email: string;
  type: 'user' | 'admin';
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return sendUnauthorized(res, 'Access token is required');
    }

    const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;

    if (decoded.type === 'user') {
      const user = await prisma.user.findUnique({
        where: { id: decoded.id }
      });

      if (!user) {
        return sendUnauthorized(res, 'User not found');
      }

      req.user = user;
    } else if (decoded.type === 'admin') {
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.id }
      });

      if (!admin) {
        return sendUnauthorized(res, 'Admin not found');
      }

      req.admin = admin;
    } else {
      return sendUnauthorized(res, 'Invalid token type');
    }

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return sendUnauthorized(res, 'Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      return sendUnauthorized(res, 'Invalid token');
    }
    
    return sendUnauthorized(res, 'Token verification failed');
  }
};

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  await authenticateToken(req, res, () => {
    if (!req.user) {
      return sendForbidden(res, 'User access required');
    }
    next();
  });
};

export const authenticateAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  await authenticateToken(req, res, () => {
    if (!req.admin) {
      return sendForbidden(res, 'Admin access required');
    }
    next();
  });
};

export const optionalAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
      const decoded = jwt.verify(token, config.jwt.secret) as JWTPayload;

      if (decoded.type === 'user') {
        const user = await prisma.user.findUnique({
          where: { id: decoded.id }
        });
        req.user = user || undefined;
      } else if (decoded.type === 'admin') {
        const admin = await prisma.admin.findUnique({
          where: { id: decoded.id }
        });
        req.admin = admin || undefined;
      }
    }
  } catch (error) {
    // Ignore authentication errors for optional auth
    console.log('Optional auth failed:', error instanceof Error ? error.message : 'Unknown error');
  }

  next();
};

export const generateToken = (id: string, email: string, type: 'user' | 'admin'): string => {
  const payload: JWTPayload = { id, email, type };
  return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiresIn as number});
};