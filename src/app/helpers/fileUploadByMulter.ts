import multer from  "multer"
import path from "path"
import { cwd } from "process"
import {v2 as cloudinary} from "cloudinary"



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(cwd(), "/uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

export const fileUploader ={
  upload
}



// 
const uploadToCloudinary = async (file:Express.Multer.File)=>{
    
}