import { v2 as cloudinary } from "cloudinary";

var cloudinaryConfig = async function () {
  try {
    // Set up Cloudinary configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  } catch (error) {
    // Handle configuration error
    throw new Error("Failed to configure Cloudinary. " + error.message);
  }
};

// Export the configured Cloudinary module
export default cloudinaryConfig;
