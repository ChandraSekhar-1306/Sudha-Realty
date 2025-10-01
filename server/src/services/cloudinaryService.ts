import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/env';
import { CloudinaryUploadResult } from '../types';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

class CloudinaryService {
  async uploadImage(
    fileBuffer: Buffer,
    fileName: string,
    folder: string = 'real-estate'
  ): Promise<CloudinaryUploadResult> {
    try {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder,
            public_id: fileName,
            transformation: [
              { width: 1200, height: 800, crop: 'limit' },
              { quality: 'auto' },
              { fetch_format: 'auto' }
            ]
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(new Error('Failed to upload image'));
            } else {
              if (!result) {
                reject(new Error('No result returned from Cloudinary'));
                return;
              }
              // Construct CloudinaryUploadResult with required properties
              const uploadResult: CloudinaryUploadResult = {
                public_id: result.public_id,
                version: result.version,
                signature: result.signature,
                width: result.width,
                height: result.height,
                format: result.format,
                resource_type: result.resource_type,
                created_at: result.created_at,
                tags: result.tags ?? [],
                bytes: result.bytes,
                type: result.type,
                etag: result.etag,
                placeholder: result.placeholder ?? false,
                url: result.secure_url || result.url,
                secure_url: result.secure_url || result.url,
                folder: folder,
                original_filename: result.original_filename
              };
              resolve(uploadResult);
            }
          }
        ).end(fileBuffer);
      });
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      throw new Error('Failed to upload image');
    }
  }

  async uploadMultipleImages(
    files: { buffer: Buffer; filename: string }[],
    folder: string = 'real-estate'
  ): Promise<CloudinaryUploadResult[]> {
    try {
      const uploadPromises = files.map((file, index) => {
        const fileName = `${Date.now()}_${index}_${file.filename}`;
        return this.uploadImage(file.buffer, fileName, folder);
      });

      return Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading multiple images:', error);
      throw new Error('Failed to upload images');
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      
      if (result.result !== 'ok') {
        throw new Error('Failed to delete image from Cloudinary');
      }
      
      console.log(`Image deleted successfully: ${publicId}`);
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      throw new Error('Failed to delete image');
    }
  }

  async deleteMultipleImages(publicIds: string[]): Promise<void> {
    try {
      const deletePromises = publicIds.map(publicId => this.deleteImage(publicId));
      await Promise.all(deletePromises);
    } catch (error) {
      console.error('Error deleting multiple images:', error);
      throw new Error('Failed to delete images');
    }
  }

  // Generate different sized URLs for responsive images
  generateResponsiveUrls(publicId: string): {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    original: string;
  } {
    const baseUrl = `https://res.cloudinary.com/${config.cloudinary.cloudName}/image/upload`;
    
    return {
      thumbnail: `${baseUrl}/w_150,h_150,c_fill/${publicId}`,
      small: `${baseUrl}/w_400,h_300,c_fill/${publicId}`,
      medium: `${baseUrl}/w_800,h_600,c_fill/${publicId}`,
      large: `${baseUrl}/w_1200,h_900,c_fill/${publicId}`,
      original: `${baseUrl}/${publicId}`,
    };
  }
}

export const cloudinaryService = new CloudinaryService();