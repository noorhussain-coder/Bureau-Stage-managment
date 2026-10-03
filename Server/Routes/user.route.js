import express  from 'express'
import { Login, Logout,  Profile, register, Student } from '../Controller/user.controller.js'
import { AuthMiddleware } from '../middleware/AuthMiddleware.js'



const userRoute=express.Router()

userRoute.post("/register",register)
userRoute.post("/login",Login)
userRoute.get("/logout",AuthMiddleware,Logout)
userRoute.get("/me",AuthMiddleware,Profile)
userRoute.get("/student",Student)

export default userRoute


