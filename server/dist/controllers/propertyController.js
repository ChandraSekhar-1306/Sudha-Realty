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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const database_1 = require("../config/database");
const responses_1 = require("../utils/responses");
class PropertyController {
    // Get all properties with filters
    static getProperties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, type, minPrice, maxPrice, location, bedrooms, bathrooms, page = '1', limit = '12' } = req.query;
                const pageNum = Number.isInteger(parseInt(page)) && parseInt(page) > 0
                    ? parseInt(page)
                    : 1;
                const limitNum = Number.isInteger(parseInt(limit)) && parseInt(limit) > 0
                    ? parseInt(limit)
                    : 12;
                const skip = (pageNum - 1) * limitNum;
                // Build where clause
                const where = {
                    status: 'AVAILABLE'
                };
                if (category)
                    where.category = category;
                if (type)
                    where.type = type;
                if (location) {
                    where.location = {
                        contains: location,
                        mode: 'insensitive'
                    };
                }
                if (bedrooms)
                    where.bedrooms = parseInt(bedrooms);
                if (bathrooms)
                    where.bathrooms = parseInt(bathrooms);
                if (minPrice || maxPrice) {
                    where.price = {};
                    if (minPrice)
                        where.price.gte = parseFloat(minPrice);
                    if (maxPrice)
                        where.price.lte = parseFloat(maxPrice);
                }
                // Get properties
                const [properties, totalCount] = yield Promise.all([
                    database_1.prisma.property.findMany({
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
                    database_1.prisma.property.count({ where })
                ]);
                // Add user favorite status if user is authenticated
                let propertiesWithFavorites = properties;
                if (req.user) {
                    const userFavorites = yield database_1.prisma.favorite.findMany({
                        where: {
                            userId: req.user.id,
                            propertyId: { in: properties.map(p => p.id) }
                        },
                        select: { propertyId: true }
                    });
                    const favoriteIds = new Set(userFavorites.map(f => f.propertyId));
                    propertiesWithFavorites = properties.map(property => (Object.assign(Object.assign({}, property), { isFavorite: favoriteIds.has(property.id) })));
                }
                const totalPages = Math.ceil(totalCount / limitNum);
                return (0, responses_1.sendSuccess)(res, 'Properties retrieved successfully', {
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
            }
            catch (error) {
                console.error('Get properties error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve properties');
            }
        });
    }
    // Get single property by ID
    static getProperty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const property = yield database_1.prisma.property.findUnique({
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
                    return (0, responses_1.sendNotFound)(res, 'Property not found');
                }
                // Check if user has favorited this property
                let isFavorite = false;
                if (req.user) {
                    const favorite = yield database_1.prisma.favorite.findUnique({
                        where: {
                            userId_propertyId: {
                                userId: req.user.id,
                                propertyId: id
                            }
                        }
                    });
                    isFavorite = !!favorite;
                }
                const propertyWithFavorite = Object.assign(Object.assign({}, property), { isFavorite });
                return (0, responses_1.sendSuccess)(res, 'Property retrieved successfully', propertyWithFavorite);
            }
            catch (error) {
                console.error('Get property error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve property');
            }
        });
    }
    // Toggle favorite property
    static toggleFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
                const { id } = req.params;
                // Check if property exists
                const property = yield database_1.prisma.property.findUnique({
                    where: { id }
                });
                if (!property) {
                    return (0, responses_1.sendNotFound)(res, 'Property not found');
                }
                // Check if already favorited
                const existingFavorite = yield database_1.prisma.favorite.findUnique({
                    where: {
                        userId_propertyId: {
                            userId: req.user.id,
                            propertyId: id
                        }
                    }
                });
                if (existingFavorite) {
                    // Remove from favorites
                    yield database_1.prisma.favorite.delete({
                        where: { id: existingFavorite.id }
                    });
                    return (0, responses_1.sendSuccess)(res, 'Property removed from favorites', {
                        isFavorite: false
                    });
                }
                else {
                    // Add to favorites
                    yield database_1.prisma.favorite.create({
                        data: {
                            userId: req.user.id,
                            propertyId: id
                        }
                    });
                    return (0, responses_1.sendSuccess)(res, 'Property added to favorites', {
                        isFavorite: true
                    });
                }
            }
            catch (error) {
                console.error('Toggle favorite error:', error);
                return (0, responses_1.sendError)(res, 'Failed to update favorite status');
            }
        });
    }
    // Get user favorites
    static getUserFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.user) {
                    return (0, responses_1.sendError)(res, 'User not authenticated', 401);
                }
                const { page = '1', limit = '12' } = req.query;
                const pageNum = parseInt(page);
                const limitNum = parseInt(limit);
                const skip = (pageNum - 1) * limitNum;
                const [favorites, totalCount] = yield Promise.all([
                    database_1.prisma.favorite.findMany({
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
                    database_1.prisma.favorite.count({
                        where: { userId: req.user.id }
                    })
                ]);
                const properties = favorites.map(fav => (Object.assign(Object.assign({}, fav.property), { isFavorite: true, favoriteId: fav.id, favoritedAt: fav.createdAt })));
                const totalPages = Math.ceil(totalCount / limitNum);
                return (0, responses_1.sendSuccess)(res, 'Favorite properties retrieved successfully', {
                    properties,
                    pagination: {
                        currentPage: pageNum,
                        totalPages,
                        totalCount,
                        hasNextPage: pageNum < totalPages,
                        hasPrevPage: pageNum > 1,
                    }
                });
            }
            catch (error) {
                console.error('Get favorites error:', error);
                return (0, responses_1.sendError)(res, 'Failed to retrieve favorite properties');
            }
        });
    }
    // Search properties
    static searchProperties(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { q, category, type, page = '1', limit = '12' } = req.query;
                const pageNum = parseInt(page);
                const limitNum = parseInt(limit);
                const skip = (pageNum - 1) * limitNum;
                if (!q || typeof q !== 'string') {
                    return (0, responses_1.sendError)(res, 'Search query is required', 400);
                }
                const where = {
                    status: 'AVAILABLE',
                    OR: [
                        { title: { contains: q, mode: 'insensitive' } },
                        { description: { contains: q, mode: 'insensitive' } },
                        { location: { contains: q, mode: 'insensitive' } },
                    ]
                };
                if (category)
                    where.category = category;
                if (type)
                    where.type = type;
                const [properties, totalCount] = yield Promise.all([
                    database_1.prisma.property.findMany({
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
                    database_1.prisma.property.count({ where })
                ]);
                const totalPages = Math.ceil(totalCount / limitNum);
                return (0, responses_1.sendSuccess)(res, 'Search results retrieved successfully', {
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
            }
            catch (error) {
                console.error('Search properties error:', error);
                return (0, responses_1.sendError)(res, 'Failed to search properties');
            }
        });
    }
}
exports.PropertyController = PropertyController;
