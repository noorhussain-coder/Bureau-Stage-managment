import mongoose, { Schema } from "mongoose";


const announcementSchema=new Schema({
    title :{
        type:String,
        required:[true,"please enter announcemnet title"],
        trim:true
    },
    description:{
          type:String,
        required:[true,"please enter announcemnet description"],
        trim:true
    } ,

    type:{
        type:String,
        enum:["drama","stage","event","audition"],
        default:""
    },
    stage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Stage",
        required:true
    },
    applicationDeadline:{
        type:Date,
        required:true
    },
    requirements:{
        type:[String],
        default:[]
    },
    isOpen:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }

},{timestamps:true})
const Announcement=mongoose.model('Announcement',announcementSchema)
export  default Announcement

