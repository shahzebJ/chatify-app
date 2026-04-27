import cloudinary from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.cloudinaryCloudName,
  api_key: ENV.cloudinaryApiKey,
  api_secret: ENV.cloudinaryApiSecret,
});

export default cloudinary;
