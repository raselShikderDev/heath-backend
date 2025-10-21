import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const envVars = {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_salt: process.env.BCRYPT_SALT,
  cloudinary: {
    key: process.env.CLOUDINARY_KEY,
    secret: process.env.CLOUDINARY_SECRET,
    name: process.env.CLOUDINARY_NAME,
    url: process.env.CLOUDINARY_URL,
  },
};
export default envVars;
