import mongoose from "mongoose";



const stageApplicationSchema= new mongoose.Schema({
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
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
    phone:{
    type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","approved","reject","inProcess"],
        default:"pending"
    },
    department:String,
    semester:String,
    description:String

},{timestamps:true})
const Application=mongoose.model('Application',stageApplicationSchema)
export default Application