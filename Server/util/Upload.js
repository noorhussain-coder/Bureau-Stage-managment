import multer  from 'multer'
import {v2 as cloudinary, UploadStream } from 'cloudinary'

const storage=multer.memoryStorage()

export const  upload=multer({storage})
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

  export  const uploadImageUrl = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "blogs",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(req.file.buffer);
    });
