import { Upload } from "../../core/adapters/Upload";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

config();

export class ImageUploader implements Upload {
  constructor() {}
  config(): Upload {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      cloud_name: process.env.CLOUD_NAME,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    return new ImageUploader();
  }

  async upload(imagePath: string) {
    try {
      const response = await cloudinary.uploader.upload(imagePath, {
        quality_analysis: true,
        transformation: {
          quality: "auto",
          fetch_format: "auto",
        },
      });

      return response.secure_url;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
