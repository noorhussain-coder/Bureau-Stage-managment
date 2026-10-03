import { catchAsyncError } from "../middleware/catchAsyncError";
import jwt from 'jsonwebtoken'
import User from "../model/User.model";
import { generateAccessToken } from "./generateToken";
import ErrorHandler from "./errorHandler";

export const refreshAccessToken=catchAsyncError(async(req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
        return new ErrorHandler('refresh Token not found',400)
    }
    const decoded=await jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
    const user=await User.findById(decoded._id)
    if(!user){
        return new ErrorHandler('user not Found')
    }
    const newaccessToken=generateAccessToken(user)
    
    res.json({accessToken:newaccessToken})
})