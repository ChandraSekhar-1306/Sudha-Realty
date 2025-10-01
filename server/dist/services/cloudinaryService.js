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
exports.cloudinaryService = void 0;
const cloudinary_1 = require("cloudinary");
const env_1 = require("../config/env");
// Configure Cloudinary
cloudinary_1.v2.config({
    cloud_name: env_1.config.cloudinary.cloudName,
    api_key: env_1.config.cloudinary.apiKey,
    api_secret: env_1.config.cloudinary.apiSecret,
});
class CloudinaryService {
    uploadImage(fileBuffer_1, fileName_1) {
        return __awaiter(this, arguments, void 0, function* (fileBuffer, fileName, folder = 'real-estate') {
            try {
                return new Promise((resolve, reject) => {
                    cloudinary_1.v2.uploader.upload_stream({
                        resource_type: 'image',
                        folder,
                        public_id: fileName,
                        transformation: [
                            { width: 1200, height: 800, crop: 'limit' },
                            { quality: 'auto' },
                            { fetch_format: 'auto' }
                        ]
                    }, (error, result) => {
                        var _a, _b;
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(new Error('Failed to upload image'));
                        }
                        else {
                            if (!result) {
                                reject(new Error('No result returned from Cloudinary'));
                                return;
                            }
                            // Construct CloudinaryUploadResult with required properties
                            const uploadResult = {
                                public_id: result.public_id,
                                version: result.version,
                                signature: result.signature,
                                width: result.width,
                                height: result.height,
                                format: result.format,
                                resource_type: result.resource_type,
                                created_at: result.created_at,
                                tags: (_a = result.tags) !== null && _a !== void 0 ? _a : [],
                                bytes: result.bytes,
                                type: result.type,
                                etag: result.etag,
                                placeholder: (_b = result.placeholder) !== null && _b !== void 0 ? _b : false,
                                url: result.secure_url || result.url,
                                secure_url: result.secure_url || result.url,
                                folder: folder,
                                original_filename: result.original_filename
                            };
                            resolve(uploadResult);
                        }
                    }).end(fileBuffer);
                });
            }
            catch (error) {
                console.error('Error uploading to Cloudinary:', error);
                throw new Error('Failed to upload image');
            }
        });
    }
    uploadMultipleImages(files_1) {
        return __awaiter(this, arguments, void 0, function* (files, folder = 'real-estate') {
            try {
                const uploadPromises = files.map((file, index) => {
                    const fileName = `${Date.now()}_${index}_${file.filename}`;
                    return this.uploadImage(file.buffer, fileName, folder);
                });
                return Promise.all(uploadPromises);
            }
            catch (error) {
                console.error('Error uploading multiple images:', error);
                throw new Error('Failed to upload images');
            }
        });
    }
    deleteImage(publicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cloudinary_1.v2.uploader.destroy(publicId);
                if (result.result !== 'ok') {
                    throw new Error('Failed to delete image from Cloudinary');
                }
                console.log(`Image deleted successfully: ${publicId}`);
            }
            catch (error) {
                console.error('Error deleting image from Cloudinary:', error);
                throw new Error('Failed to delete image');
            }
        });
    }
    deleteMultipleImages(publicIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletePromises = publicIds.map(publicId => this.deleteImage(publicId));
                yield Promise.all(deletePromises);
            }
            catch (error) {
                console.error('Error deleting multiple images:', error);
                throw new Error('Failed to delete images');
            }
        });
    }
    // Generate different sized URLs for responsive images
    generateResponsiveUrls(publicId) {
        const baseUrl = `https://res.cloudinary.com/${env_1.config.cloudinary.cloudName}/image/upload`;
        return {
            thumbnail: `${baseUrl}/w_150,h_150,c_fill/${publicId}`,
            small: `${baseUrl}/w_400,h_300,c_fill/${publicId}`,
            medium: `${baseUrl}/w_800,h_600,c_fill/${publicId}`,
            large: `${baseUrl}/w_1200,h_900,c_fill/${publicId}`,
            original: `${baseUrl}/${publicId}`,
        };
    }
}
exports.cloudinaryService = new CloudinaryService();
