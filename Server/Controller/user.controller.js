
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import sessionModel from "../model/session.model.js";
import User from "../model/User.model.js";
import ErrorHandler from "../util/errorHandler.js";
import { generateAccessToken, generateRefreshToken } from "../util/generateToken.js";
import crypto from 'crypto'


export const  register=catchAsyncError(async(req,res)=>{
const {name,email,password}=req.body
console.log(name,email,password)
if(!name||!email||!password){
    throw new ErrorHandler("please enter all field",400)
}

const user= await User.findOne({email})
console.log(user)
if(user){
    console.log('user not found')
throw new ErrorHandler('User already Exist Use Another Email ',400)
}

    const newUser=await User.create({
        email,
       name,
        password
    })
    
    console.log(newUser,'new')
res.status(200).json({
    message:"User created Successfully",
    // user:{name:newUser.name,email:newUser.email,role:newUser.role,}
    newUser

})
})

export const Login=catchAsyncError(async(req,res,next)=>{
const {email,password}=req.body
if(!email||!password){
    throw new ErrorHandler('email and password must be fill',400)
}
const user =await User.findOne({email})
if(!user){
    throw new ErrorHandler('Invalid email or password',400)
}
const isMatch=await user.matchPassword(password)
if(!isMatch){
 throw new ErrorHandler('Invalid email or password',400)
}
console.log(isMatch)
const refreshToken=generateRefreshToken(user)


const refreshTokenHash=crypto.createHash("sha256").update(refreshToken).digest("hex")
const session=await sessionModel.create({
    user:user._id,
    refreshTokenHash,
    ip:req.ip,
    userAgent:req.headers["user-agent"]
})
console.log(session,refreshToken)
const accessToken=generateAccessToken(user,session)
res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
res.json({status:200,accessToken,user:{id:user._id,username:user.username,email:user.email,role:user.role},
    message:'login Successfully'
})
})
export const Profile=catchAsyncError(async(req,res,next)=>{
    const user=await user.findById((req.user._id)).select("-password")
    if(!user){
        throw new ErrorHandler('User not Found',400)
    }
    res.json({user})
})
export const  Logout=catchAsyncError(async(req,res,next)=>{
    res.clearCookie('refreshToken',{
        httpOnly:false,
        sameSite:"lax"
    })
    res.json({message:"Logout Successfully"})
})
// export const  Student=catchAsyncError(async(req,res)=>{
// const student = await User.find(
//     {role:"user"},"name email"
// ).sort({name:1})
// if(!student) throw new ErrorHandler('student not found')
//     res.json({status:true,student, message:"all Student"})
// })

export const Student = catchAsyncError(async (req, res, next) => {

    const student = await User.find()
    if (!student) {
        throw new ErrorHandler("Students not found", 404);
    }

    res.status(200).json({
        success: true,
        student,
        message: "All students"
    });

});
