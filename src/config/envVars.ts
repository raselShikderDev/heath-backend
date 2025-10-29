import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVars = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt: process.env.BCRYPT_SALT,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
  RESET_PASS_EXPIRES: process.env.RESET_PASS_EXPIRES,
  RESET_PASS_SECRET: process.env.RESET_PASS_SECRET,
  email:{
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    SMTP_FROM: process.env.SMTP_FROM,
    SMTP_HOST: process.env.SMTP_HOST,
  },
  cloudinary: {
    key: process.env.CLOUDINARY_KEY,
    secret: process.env.CLOUDINARY_SECRET,
    name: process.env.CLOUDINARY_NAME,
    url: process.env.CLOUDINARY_URL,
  },
  jwt:{
    access_secret:process.env.JWT_ACCESS_SECRET,
    access_expires:process.env.JWT_ACCESS_EXPIRES,
    refresh_secret:process.env.JWT_REFRESH_SECRET,
    refresh_expires:process.env.JWT_REFRESH_EXPIRES,
  }
};
export default envVars;
