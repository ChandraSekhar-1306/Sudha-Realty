import { Response } from 'express';
import { prisma } from '../config/database';
import { AuthenticatedRequest, PropertyFilters } from '../types';
import { sendSuccess, sendError, sendNotFound } from '../utils/responses';

export class PropertyController {
  // Get all properties with filters
  static async getProperties(req: AuthenticatedRequest, res: Response) {
    try {
      const {
        category,
        type,
        minPrice,
        maxPrice,
        location,
        bedrooms,
        bathrooms,
        page = '1',
        limit = '12'
      }: PropertyFilters & { page?: string; limit?: string } = req.query;

     const pageNum = Number.isInteger(parseInt(page)) && parseInt(page) > 0 
      ? parseInt(page) 
      : 1;

const limitNum = Number.isInteger(parseInt(limit)) && parseInt(limit) > 0 
      ? parseInt(limit) 
      : 12;
      const skip = (pageNum - 1) * limitNum;

      // Build where clause
      const where: any = {
        status: 'AVAILABLE'
      };

      if (category) where.category = category;
      if (type) where.type = type;
      if (location) {
        where.location = {
          contains: location,
          mode: 'insensitive'
        };
      }
      if (bedrooms) where.bedrooms = parseInt(bedrooms);
      if (bathrooms) where.bathrooms = parseInt(bathrooms);
      
      if (minPrice || maxPrice) {
        where.price = {};
        if (minPrice) where.price.gte = parseFloat(minPrice);
        if (maxPrice) where.price.lte = parseFloat(maxPrice);
      }

      // Get properties
      const [properties, totalCount] = await Promise.all([
        prisma.property.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            price: true,
            location: true,
            area: true,
            bedrooms: true,
            bathrooms: true,
            category: true,
            type: true,
            images: true,
            features: true,
            createdAt: true,
            _count: {
              select: {
                favorites: true,
                inquiries: true,
              }
            }
          }
        }),
        prisma.property.count({ where })
      ]);

      // Add user favorite status if user is authenticated
      let propertiesWithFavorites = properties;
      if (req.user) {
        const userFavorites = await prisma.favorite.findMany({
          where: {
            userId: req.user.id,
            propertyId: { in: properties.map(p => p.id) }
          },
          select: { propertyId: true }
        });

        const favoriteIds = new Set(userFavorites.map(f => f.propertyId));
        
        propertiesWithFavorites = properties.map(property => ({
          ...property,
          isFavorite: favoriteIds.has(property.id)
        }));
      }

      const totalPages = Math.ceil(totalCount / limitNum);

      return sendSuccess(res, 'Properties retrieved successfully', {
        properties: propertiesWithFavorites,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
        filters: {
          category,
          type,
          minPrice,
          maxPrice,
          location,
          bedrooms,
          bathrooms,
        }
      });
    } catch (error) {
      console.error('Get properties error:', error);
      return sendError(res, 'Failed to retrieve properties');
    }
  }

  // Get single property by ID
  static async getProperty(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      const property = await prisma.property.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              favorites: true,
              inquiries: true,
            }
          }
        }
      });

      if (!property) {
        return sendNotFound(res, 'Property not found');
      }

      // Check if user has favorited this property
      let isFavorite = false;
      if (req.user) {
        const favorite = await prisma.favorite.findUnique({
          where: {
            userId_propertyId: {
              userId: req.user.id,
              propertyId: id
            }
          }
        });
        isFavorite = !!favorite;
      }

      const propertyWithFavorite = {
        ...property,
        isFavorite
      };

      return sendSuccess(res, 'Property retrieved successfully', propertyWithFavorite);
    } catch (error) {
      console.error('Get property error:', error);
      return sendError(res, 'Failed to retrieve property');
    }
  }

  // Toggle favorite property
  static async toggleFavorite(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      const { id } = req.params;

      // Check if property exists
      const property = await prisma.property.findUnique({
        where: { id }
      });

      if (!property) {
        return sendNotFound(res, 'Property not found');
      }

      // Check if already favorited
      const existingFavorite = await prisma.favorite.findUnique({
        where: {
          userId_propertyId: {
            userId: req.user.id,
            propertyId: id
          }
        }
      });

      if (existingFavorite) {
        // Remove from favorites
        await prisma.favorite.delete({
          where: { id: existingFavorite.id }
        });

        return sendSuccess(res, 'Property removed from favorites', {
          isFavorite: false
        });
      } else {
        // Add to favorites
        await prisma.favorite.create({
          data: {
            userId: req.user.id,
            propertyId: id
          }
        });

        return sendSuccess(res, 'Property added to favorites', {
          isFavorite: true
        });
      }
    } catch (error) {
      console.error('Toggle favorite error:', error);
      return sendError(res, 'Failed to update favorite status');
    }
  }

  // Get user favorites
  static async getUserFavorites(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user) {
        return sendError(res, 'User not authenticated', 401);
      }

      const { page = '1', limit = '12' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      const [favorites, totalCount] = await Promise.all([
        prisma.favorite.findMany({
          where: { userId: req.user.id },
          skip,
          take: limitNum,
          include: {
            property: {
              select: {
                id: true,
                title: true,
                price: true,
                location: true,
                area: true,
                bedrooms: true,
                bathrooms: true,
                category: true,
                type: true,
                images: true,
                features: true,
                status: true,
                createdAt: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' }
        }),
        prisma.favorite.count({
          where: { userId: req.user.id }
        })
      ]);

      const properties = favorites.map(fav => ({
        ...fav.property,
        isFavorite: true,
        favoriteId: fav.id,
        favoritedAt: fav.createdAt
      }));

      const totalPages = Math.ceil(totalCount / limitNum);

      return sendSuccess(res, 'Favorite properties retrieved successfully', {
        properties,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        }
      });
    } catch (error) {
      console.error('Get favorites error:', error);
      return sendError(res, 'Failed to retrieve favorite properties');
    }
  }

  // Search properties
  static async searchProperties(req: AuthenticatedRequest, res: Response) {
    try {
      const { q, category, type, page = '1', limit = '12' } = req.query;
      const pageNum = parseInt(page as string);
      const limitNum = parseInt(limit as string);
      const skip = (pageNum - 1) * limitNum;

      if (!q || typeof q !== 'string') {
        return sendError(res, 'Search query is required', 400);
      }

      const where: any = {
        status: 'AVAILABLE',
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { location: { contains: q, mode: 'insensitive' } },
        ]
      };

      if (category) where.category = category;
      if (type) where.type = type;

      const [properties, totalCount] = await Promise.all([
        prisma.property.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: { createdAt: 'desc' },
          select: {
            id: true,
            title: true,
            price: true,
            location: true,
            area: true,
            bedrooms: true,
            bathrooms: true,
            category: true,
            type: true,
            images: true,
            features: true,
            createdAt: true,
          }
        }),
        prisma.property.count({ where })
      ]);

      const totalPages = Math.ceil(totalCount / limitNum);

      return sendSuccess(res, 'Search results retrieved successfully', {
        properties,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalCount,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
        searchQuery: q,
        filters: { category, type }
      });
    } catch (error) {
      console.error('Search properties error:', error);
      return sendError(res, 'Failed to search properties');
    }
  }
}