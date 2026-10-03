import mongoose from "mongoose";


const stageSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:[true,'pleade enter stage desciption']
    },
    location:{
        type:String,
        required:[true,'please enter location']
    },
    latitude:{
        type:Number,
        required:true,
    },
    longitude:{
        type:Number,
        required:true
    },
    startTime:{
        type:Date,
        required:true
    },
    endTime:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["upcoming","ongoing","Completed","cancelled"],
        default:"upcoming"
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
        
    }


},{timestamps:true})
const Stage=mongoose.model("Stage",stageSchema)
export default Stage