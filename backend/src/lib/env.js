import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  port: process.env.PORT,
  clientUrl: process.env.CLIENT_URL,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  resendApiKey: process.env.RESEND_API_KEY,
  emailFrom: process.env.EMAIL_FROM,
  emailFromName: process.env.EMAIL_FROM_NAME,
};
