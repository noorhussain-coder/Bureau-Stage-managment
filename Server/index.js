import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import ErrorMiddleware from './middleware/ErrorMiddleware.js'
import { DataBase } from './config/DB.js'
import { catchAsyncError } from './middleware/catchAsyncError.js'
import cookieParser from 'cookie-parser'
import userRoute from './Routes/user.route.js'
import announcementRoute from './Routes/annonucement.route.js'
import applicationRouter from './Routes/application.route.js'
import blogRoute from './Routes/blog.route.js'
import emailRouter from './Routes/email.route.js'
import stagesRouter from './Routes/stage.route.js'

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
DataBase()
app.use(cors({origin:"http://localhost:5173",credentials:true,methods:["GET","POST","PUT","DELETE"]}))


app.use('/api',userRoute)
app.use('/api/announcement',announcementRoute)
app.use('/api/apply',applicationRouter)
app.use('/api/blog',blogRoute)
app.use('/api/email',emailRouter)
app.use('/api/stage',stagesRouter)


app.use(ErrorMiddleware)
// app.use(catchAsyncError)


const port=process.env.PORT||3000
app.listen(port,()=>{console.log('port running')})