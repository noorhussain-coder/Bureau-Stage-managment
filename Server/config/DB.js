import mongoose from "mongoose"

export const DataBase=async()=>{
    const {connection} =await mongoose.connect(process.env.MONGO_URI2)
    console.log('mongodb connect with ',connection.host)

} 
