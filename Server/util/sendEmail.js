
import  createTransport from 'nodemailer'
export const sendEmail=async(to,subject,text)=>{
    const transporter=createTransport({
        service:"gmail",
     
        auth:{
           user: process.env.SMTP_USER,
            pass:process.env.SMTP_PASS,
        }
       
    })
    await transporter.sendMail({
         from,to,text,subject})
}