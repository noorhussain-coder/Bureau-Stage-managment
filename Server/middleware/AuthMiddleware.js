import User from "../model/User.model.js";
import ErrorHandler from "../util/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from 'jsonwebtoken'




export const  AuthMiddleware=catchAsyncError(async(req,res,next)=>{

    const  token=req.cookies.refreshToken
    const  {refreshToken}=req.cookies
    // console.log(refreshToken)
    if(!token)throw next(new ErrorHandler("Not Logged In",401))
    const decoded=   await jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    // console.log(decoded,'decoded')
    const user=await User.findById(decoded.id)
    
     req.user=user
    next()
})
export const AuthorizeAdmin=(req,res,next)=>{
    if(req.user.role!=="admin"){
        throw next(new ErrorHandler(`${req.user.role}is not allowed to access this resource`))
    }
    next()
}