// import { catchAsyncError } from "../middleware/catchAsyncError";
// import Email from "../model/email.model";
// import ErrorHandler from "../util/errorHandler";
// import { sendEmail } from "../util/sendEmail";


// export const SendEmailAll=catchAsyncError(async(req,res)=>{
//     const {to,subject,text}=req.body
// const user =req.user
// const from=user.email
//     if(!to||!subject||!text){
//         return new ErrorHandler('please fill all field')
//     }
//     const createEmail=await Email.create({
//         from,
//         to,
//         subject,
//         status:"pending"

//     })
//     const email=await sendEmail(
//         from,to,subject,text)
//     if(!email){
//         return new ErrorHandler('Email Could not sent')
//     }
   

//     res.json({status:200,message:"Email has been sent " ,createEmail,email})


// })
// export const getEmailById = async (req, res) => {
//   try {
//     const email = await Email.findById(req.params.id);

//     if (!email) {
//       return res.status(404).json({
//         success: false,
//         message: "Email not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       email,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// export const getEmailHistory = async (req, res) => {
//   try {
//     const emails = await Email.find()
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       emails,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Email from "../model/email.model.js";
import User from "../model/User.model.js";
import ErrorHandler from "../util/errorHandler.js";
import { sendEmail } from "../util/sendEmail.js";



export const SendEmailAll = catchAsyncError(async (req, res, next) => {

    const { to, subject, text } = req.body;

    const user = req.user;

    if (!user) {
        throw new ErrorHandler(
            "User not authenticated",
            401
        );
    }

    const from = user.email;


 

    if (!subject || !text) {
        throw new ErrorHandler(
            "Please enter subject and message",
            400
        );
    }


    // =========================
    // Get recipients
    // =========================

    let recipients = [];


    // If "all" is requested
    if (to === "all") {

        const students = await User.find(
            { role: "user" },
            { email: 1, _id: 0 }
        );

        recipients = students.map(
            student => student.email
        );

    }

    // Selected emails
    else if (Array.isArray(to)) {

        recipients = to;
    }

    // Single email
    else if (typeof to === "string") {

        recipients = [to];
    }


    // =========================
    // Check recipients
    // =========================

    if (recipients.length === 0) {
        throw new ErrorHandler(
            "No recipients found",
            400
        );
    }


    // =========================
    // Create email history
    // =========================

    const createEmail = await Email.create({
        from,
        to: recipients,
        subject,
        text,
        status: "pending"
    });


    // =========================
    // Send email
    // =========================

    try {

        const email = await sendEmail(
            from,
            recipients,
            subject,
            text
        );


        // =========================
        // Update history
        // =========================

        createEmail.status = "sent";
        createEmail.sentAt = new Date();

        await createEmail.save();


        res.status(200).json({
            success: true,
            message: "Email sent successfully",
            email: createEmail
        });


    } catch (error) {

        createEmail.status = "failed";

        await createEmail.save();

        throw new ErrorHandler(
            "Email could not be sent",
            500
        );
    }
});



export const getEmailById = catchAsyncError(
    async (req, res, next) => {

        const email = await Email.findById(
            req.params.id
        );

        if (!email) {
            throw new ErrorHandler(
                "Email not found",
                404
            );
        }

        res.status(200).json({
            success: true,
            email
        });
    }
);


export const getEmailHistory = catchAsyncError(
    async (req, res, next) => {

        const emails = await Email.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: emails.length,
            emails
        });
    }
);


export const deleteEmail = catchAsyncError(
    async (req, res, next) => {

        const email = await Email.findById(
            req.params.id
        );

        if (!email) {
            throw new ErrorHandler(
                "Email not found",
                404
            );
        }

        await Email.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Email history deleted successfully"
        });
    }
);

