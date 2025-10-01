// middleware/parseFormData.ts
import { Request, Response, NextFunction } from 'express';

export function parseFormData(req: Request, res: Response, next: NextFunction) {
  if (req.body.features && typeof req.body.features === 'string') {
    try {
      req.body.features = JSON.parse(req.body.features);
    } catch {
      req.body.features = [];
    }
  }

  if (req.body.coordinates && typeof req.body.coordinates === 'string') {
    try {
      req.body.coordinates = JSON.parse(req.body.coordinates);
    } catch {
      req.body.coordinates = undefined;
    }
  }

  next();
}
