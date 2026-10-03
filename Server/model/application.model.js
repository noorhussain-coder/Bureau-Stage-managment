import mongoose from "mongoose";



const stageApplicationSchema= new mongoose.Schema({
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    announcement:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Announcement",
        required:true
    },
    stage:{
          type:mongoose.Schema.Types.ObjectId,
        ref:"Stage",
        required:true 
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","reject","inProcess"],
        default:"pending"
    }
},{timestamps:true})
const Application=mongoose.model('Application',stageApplicationSchema)
export default Application