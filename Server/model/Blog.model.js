import mongoose, { mongo } from "mongoose";


const blogScehma=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true

    },
    image:{
       imageUrl:{
        type:String,
        required:true
       },
       secureId:{
        type:String,
        required:true
       }
    },
    type:{
        type:String ,
        enum:["information","performance"]
    },
    images:[{
        imageUrl:{
        type:String,
            
    },
       secureId:{
        type:String, }
    }],
    category:{
        type:String,

        default:'general',
    },
    isPublished:{
        type:Boolean,
        default:false
    }
},{timestamps:true})
const Blog=mongoose.model("Blog",blogScehma)
export default Blog