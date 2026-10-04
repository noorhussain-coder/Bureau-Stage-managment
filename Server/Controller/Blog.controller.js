import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Blog from "../model/Blog.model.js";
import ErrorHandler from "../util/errorHandler.js";
import { uploadImageUrl } from "../util/Upload.js";


export  const CreateBlog=catchAsyncError(async(req,res,next)=>{
    const {title,description, category, } =req.body
    const file=req.file.buffer
    // console.log(file,'blog')
 

    const imgurl=await uploadImageUrl(file)

    if(!imgurl){
        throw new ErrorHandler('Image could not upload ',400)
    }
  
    const blog=await Blog.create({
        title,
        description,
        category,
        image:{
           imageUrl :imgurl.secure_url,
            secureId:imgurl.public_id
        },
         auther:req.user._id
    })
if(!blog){
     throw new ErrorHandler('could not created blog ',400)
}
res.json({status:200,message:'Blog created Successfully',blog})
})
export  const UpdateBlog=catchAsyncError(async(req,res,next)=>{
    const {title,description, category, } =req.body
    const {file}=req.file.buffer
    const {id}=req.params
    
    const imgurl=await uploadImageUrl(file)
    if(!imgurl){
        throw new ErrorHandler('Image could not upload ',400)
    }
    const blog=await Blog.findByIdAndUpdate(id,{
        title,
        description,
        category,
        image:{
            imgeUrl:file.secure_url,
            secureId:file.public_id
        },
         auther:req.user._id
    },{new:true})
if(!blog){
     throw new ErrorHandler('could not created blog ',400)
}
res.json({status:200,message:'Blog created Successfully',blog})
})

export const GetBlogs=catchAsyncError(async(req,res)=>{
    
    const blog= await Blog.find();
    if(!blog){
        throw new ErrorHandler('Blog could not found',400)
    }
    res.json({status:200,message:'successfully Blogs Recieve ',blog})
})
export const deleteBlog=catchAsyncError(async(req,res)=>{
    const {id}=req.params
    if(!id){
        throw new ErrorHandler('could not found Blog',400)
    }
    const deletes=await Blog.findByIdAndDelete(id)
    if(!deletes) throw new ErrorHandler('could not delete',400)
    res.json({status:200,message:'delete successfully ',deletes})    

})