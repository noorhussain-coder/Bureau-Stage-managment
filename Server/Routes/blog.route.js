import express from 'express'
import { CreateBlog, deleteBlog, GetBlogs, UpdateBlog } from '../Controller/Blog.controller.js'


const blogRoute=express.Router()

blogRoute.post('/create',CreateBlog)
blogRoute.post('/update/:id',UpdateBlog)
blogRoute.get('/get',GetBlogs)
blogRoute.get('/delete/:id',deleteBlog)
export default blogRoute