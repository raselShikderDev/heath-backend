import multer from "multer";
import path from "path";
import { cwd } from "process";
import { v2 as cloudinary } from "cloudinary";
import envVars from "../../config/envVars";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

// upload to cloudinary
const uploadToCloudinary = async (file: Express.Multer.File) => {
  // Configuration
  cloudinary.config({
    cloud_name: envVars.cloudinary.name,
    api_key: envVars.cloudinary.key,
    api_secret: envVars.cloudinary.secret,
  });

  // Upload an image
  try {
    const uploadResult = await cloudinary.uploader
      .upload(file.path, {
        public_id: file.filename,
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("uploadResult", uploadResult);
    return uploadResult;
  } catch (error) {}
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
