/**
 * This module configures Cloudinary with API credentials for image and video storage.
 * @module cloudinaryConfig
 */

const cloudinary = require("cloudinary").v2;

/**
 * Configures Cloudinary with API credentials.
 * @async
 * @function
 * @name cloudinaryConfig
 * @throws {Error} Throws an error if configuration fails.
 */
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
module.exports = cloudinaryConfig;