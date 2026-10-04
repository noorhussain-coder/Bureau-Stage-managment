import express from 'express'
import { CreateBlog, deleteBlog, GetBlogs, UpdateBlog } from '../Controller/Blog.controller.js'
import { upload } from '../util/Upload.js'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js'


const blogRoute=express.Router()

blogRoute.post('/create',AuthMiddleware,upload.single("file"),CreateBlog)
blogRoute.post('/update/:id',UpdateBlog)
blogRoute.get('/get',GetBlogs)
blogRoute.get('/delete/:id',deleteBlog)
export default blogRoute