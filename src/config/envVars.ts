import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVars = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt: process.env.BCRYPT_SALT,
  OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
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
