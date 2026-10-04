// import express from 'express'
// import { CreateBlog, deleteBlog, GetBlogs, UpdateBlog } from '../Controller/Blog.controller.js'
// import { upload } from '../util/Upload.js'
// import { AuthMiddleware } from '../middleware/AuthMiddleware.js'


// const blogRoute=express.blogRoute()

// blogRoute.post('/create',AuthMiddleware,upload.single("file"),CreateBlog)
// blogRoute.post('/update/:id',UpdateBlog)
// blogRoute.get('/get',GetBlogs)
// blogRoute.get('/delete/:id',deleteBlog)
// export default blogRoute

import express from "express";
// import multer from "multer";

import {
    CreateBlog,
    UpdateBlog,
    GetBlogs,
    GetSingleBlog,
    deleteBlog,
} from "../controller/Blog.controller.js";
import { upload } from "../util/Upload.js";
import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const blogRoute = express.Router();


// ======================================================
// MULTER CONFIGURATION
// ===================================================
blogRoute.get(
    "/get",
    GetBlogs
);


// ======================================================
// GET SINGLE BLOG
// ======================================================

blogRoute.get(
    "/:id",
    GetSingleBlog
);


// ======================================================
// CREATE BLOG
// ======================================================

blogRoute.post(
    "/create",AuthMiddleware,

    upload.fields([
        {
            name: "featuredImage",
            maxCount: 1,
        },
        {
            name: "images",
            maxCount: 20,
        },
    ]),

    CreateBlog
);


// ======================================================
// UPDATE BLOG
// ======================================================

blogRoute.put(
    "/update/:id",

    upload.fields([
        {
            name: "featuredImage",
            maxCount: 1,
        },
        {
            name: "images",
            maxCount: 20,
        },
    ]),

    UpdateBlog
);


// ======================================================
// DELETE BLOG
// ======================================================

blogRoute.delete(
    "/:id",
    deleteBlog
);


export default blogRoute;