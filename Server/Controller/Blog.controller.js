// import { catchAsyncError } from "../middleware/catchAsyncError.js";
// import Blog from "../model/Blog.model.js";
// import ErrorHandler from "../util/errorHandler.js";
// import { uploadImageUrl } from "../util/Upload.js";


// export  const CreateBlog=catchAsyncError(async(req,res,next)=>{
//     const {title,description, category, } =req.body
//     const file=req.file.buffer
//     // console.log(file,'blog')
 

//     const imgurl=await uploadImageUrl(file)

//     if(!imgurl){
//         throw new ErrorHandler('Image could not upload ',400)
//     }
  
//     const blog=await Blog.create({
//         title,
//         description,
//         category,
//         image:{
//            imageUrl :imgurl.secure_url,
//             secureId:imgurl.public_id
//         },
//          auther:req.user._id
//     })
// if(!blog){
//      throw new ErrorHandler('could not created blog ',400)
// }
// res.json({status:200,message:'Blog created Successfully',blog})
// })
// export  const UpdateBlog=catchAsyncError(async(req,res,next)=>{
//     const {title,description, category, } =req.body
//     const {file}=req.file.buffer
//     const {id}=req.params
    
//     const imgurl=await uploadImageUrl(file)
//     if(!imgurl){
//         throw new ErrorHandler('Image could not upload ',400)
//     }
//     const blog=await Blog.findByIdAndUpdate(id,{
//         title,
//         description,
//         category,
//         image:{
//             imgeUrl:file.secure_url,
//             secureId:file.public_id
//         },
//          auther:req.user._id
//     },{new:true})
// if(!blog){
//      throw new ErrorHandler('could not created blog ',400)
// }
// res.json({status:200,message:'Blog created Successfully',blog})
// })

// export const GetBlogs=catchAsyncError(async(req,res)=>{
    
//     const blog= await Blog.find();
//     if(!blog){
//         throw new ErrorHandler('Blog could not found',400)
//     }
//     res.json({status:200,message:'successfully Blogs Recieve ',blog})
// })
// export const deleteBlog=catchAsyncError(async(req,res)=>{
//     const {id}=req.params
//     if(!id){
//         throw new ErrorHandler('could not found Blog',400)
//     }
//     const deletes=await Blog.findByIdAndDelete(id)
//     if(!deletes) throw new ErrorHandler('could not delete',400)
//     res.json({status:200,message:'delete successfully ',deletes})    

// })

import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Blog from "../model/Blog.model.js";
import ErrorHandler from "../util/errorHandler.js";
import { uploadImageUrl } from "../util/Upload.js";


// ======================================================
// CREATE BLOG
// ======================================================

export const CreateBlog = catchAsyncError(async (req, res, next) => {


    const {
        title,
        description,
        category,
        type,
        isPublished,
    } = req.body;


    if (!title || !description) {
        return next(
            new ErrorHandler(
                "Title and description are required",
                400
            )
        );
    }



    const featuredFile =
        req.files?.featuredImage?.[0];


    if (!featuredFile) {
        return next(
            new ErrorHandler(
                "Featured image is required",
                400
            )
        );
    }


    // Upload featured image
    const featuredUpload =
        await uploadImageUrl(featuredFile.buffer);


    if (!featuredUpload) {
        return next(
            new ErrorHandler(
                "Featured image could not upload",
                400
            )
        );
    }


  
    const galleryFiles =
        req.files?.images || [];


    const galleryImages = [];


    for (const file of galleryFiles) {

        const uploaded =
            await uploadImageUrl(file.buffer);


        if (uploaded) {

            galleryImages.push({

                imageUrl: uploaded.secure_url,

                secureId: uploaded.public_id,

            });

        }

    }


    // -----------------------------
    // Create blog
    // -----------------------------

    const blog = await Blog.create({

        title: title.trim(),

        description: description.trim(),

        category: category || "general",

        type: type || "information",

        isPublished:
            isPublished === "true" ||
            isPublished === true,

        image: {

            imageUrl:
                featuredUpload.secure_url,

            secureId:
                featuredUpload.public_id,

        },

        images: galleryImages,

        auther: req.user._id,

    });


    if (!blog) {
        return next(
            new ErrorHandler(
                "Could not create blog",
                400
            )
        );
    }


    res.status(201).json({

        success: true,

        status: 201,

        message: "Blog created successfully",

        blog,

    });

});


// ======================================================
// UPDATE BLOG
// ======================================================

export const UpdateBlog = catchAsyncError(async (req, res, next) => {

    console.log("========== UPDATE BLOG ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    console.log("=================================");

    const { id } = req.params;

    const {
        title,
        description,
        category,
        type,
        isPublished,
        existingImages,
    } = req.body;


    // -----------------------------
    // Find blog
    // -----------------------------

    const blog =
        await Blog.findById(id);


    if (!blog) {
        return next(
            new ErrorHandler(
                "Blog not found",
                404
            )
        );
    }


    // -----------------------------
    // Update text fields
    // -----------------------------

    if (title !== undefined) {
        blog.title = title.trim();
    }

    if (description !== undefined) {
        blog.description = description.trim();
    }

    if (category !== undefined) {
        blog.category = category;
    }

    if (type !== undefined) {
        blog.type = type;
    }

    if (isPublished !== undefined) {

        blog.isPublished =
            isPublished === "true" ||
            isPublished === true;

    }


    // -----------------------------
    // New featured image
    // -----------------------------

    const featuredFile =
        req.files?.featuredImage?.[0];


    if (featuredFile) {

        const uploaded =
            await uploadImageUrl(
                featuredFile.buffer
            );


        if (!uploaded) {
            return next(
                new ErrorHandler(
                    "Featured image could not upload",
                    400
                )
            );
        }


        blog.image = {

            imageUrl:
                uploaded.secure_url,

            secureId:
                uploaded.public_id,

        };

    }


    // -----------------------------
    // Existing gallery images
    // -----------------------------

    let oldImages = [];


    if (existingImages) {

        try {

            oldImages =
                JSON.parse(existingImages);

        } catch (error) {

            oldImages = [];

        }

    }


    blog.images = oldImages.map((image) => ({

        imageUrl: image.imageUrl,

        secureId: image.secureId,

    }));


    // -----------------------------
    // New gallery images
    // -----------------------------

    const galleryFiles =
        req.files?.images || [];


    for (const file of galleryFiles) {

        const uploaded =
            await uploadImageUrl(file.buffer);


        if (uploaded) {

            blog.images.push({

                imageUrl:
                    uploaded.secure_url,

                secureId:
                    uploaded.public_id,

            });

        }

    }


    // -----------------------------
    // Update author
    // -----------------------------

    if (req.user?._id) {
        blog.auther = req.user._id;
    }


    // -----------------------------
    // Save
    // -----------------------------

    await blog.save();


    res.status(200).json({

        success: true,

        status: 200,

        message: "Blog updated successfully",

        blog,

    });

});


// ======================================================
// GET ALL BLOGS
// ======================================================

export const GetBlogs =
    catchAsyncError(async (req, res, next) => {

        const blogs = await Blog.find()
            .populate(
                "auther",
                "name email"
            )
            .sort({
                createdAt: -1,
            });


        res.status(200).json({

            success: true,

            status: 200,

            message: "Blogs received successfully",

            blogs,

        });

    });


// ======================================================
// GET SINGLE BLOG
// ======================================================

export const GetSingleBlog =
    catchAsyncError(async (req, res, next) => {

        const { id } = req.params;


        const blog =
            await Blog.findById(id)
                .populate(
                    "auther",
                    "name email"
                );


        if (!blog) {

            return next(
                new ErrorHandler(
                    "Blog not found",
                    404
                )
            );

        }


        res.status(200).json({

            success: true,

            status: 200,

            message:
                "Blog received successfully",

            blog,

        });

    });


// ======================================================
// DELETE BLOG
// ======================================================

export const deleteBlog =
    catchAsyncError(async (req, res, next) => {

        const { id } = req.params;


        if (!id) {

            return next(
                new ErrorHandler(
                    "Blog ID is required",
                    400
                )
            );

        }


        const blog =
            await Blog.findByIdAndDelete(id);


        if (!blog) {

            return next(
                new ErrorHandler(
                    "Blog not found",
                    404
                )
            );

        }


        res.status(200).json({

            success: true,

            status: 200,

            message:
                "Blog deleted successfully",

            blog,

        });

    });