import mongoose from "mongoose";





const sessionSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'User is requred']
    },
    refreshTokenHash:{
        type:String,
        required:[true,"Refresh Token is required"]
    },
      ip:{
        type:String,
        required:[true,"IP address is required"]
    },
      userAgent:{
        type:String,
        required:[true,"user agrent is required"]
    },
    revoked:{
        type:Boolean,
        default:false
    }
},{timesramps:true})

const sessionModel=mongoose.model("Session",sessionSchema)
export default sessionModel