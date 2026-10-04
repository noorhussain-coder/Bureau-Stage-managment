import multer  from 'multer'
import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv'
import { catchAsyncError } from '../middleware/catchAsyncError.js'
dotenv.config()
const storage=multer.memoryStorage()

export const  upload=multer({storage})
cloudinary.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret
})

  // export  const uploadImageUrl =catchAsyncError(async(file)=>{
  //   // console.log(file,'image')
  //  return  await new Promise((resolve, reject) => {
  //     const uploadStream =  cloudinary.uploader.upload_stream(
  //       {
  //         folder: "blogs",
  //       },
  //       (error, result) => {
  //         if (error) {
  //           console.log(error)
  //           reject(error);
  //         } else {
  //           resolve(result);
  //           console.log(result)
  //         }
  //       }
  //     );

  //     uploadStream.end(file);
  //   });

  // })

  export const uploadImageUrl = async (file) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "blogs",
                resource_type: "image"
            },
            (error, result) => {

                if (error) {
                    console.log("Cloudinary Error:", error);
                    reject(error);
                    return;
                }

                console.log("Cloudinary Result:", result);

                resolve(result); // 👈 return result through Promise
            }
        );

        uploadStream.end(file);
    });
};