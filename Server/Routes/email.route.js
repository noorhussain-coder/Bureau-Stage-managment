
import express from "express";

import {
 
    deleteEmail,
    getEmailById,
    getEmailHistory,
    SendEmailAll
} from "../Controller/email.controller.js";

import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const emailRouter = express.Router();


// Create email
emailRouter.post(
    "/emails",
    AuthMiddleware,
   SendEmailAll
);


// Get all emails
emailRouter.get(
    "/emails",
    AuthMiddleware,
    getEmailHistory
);


// Get single email
emailRouter.get(
    "/emails/:id",
    AuthMiddleware,
  getEmailById
);


// Update email
// emailRouter.put(
//     "/emails/:id",
//     AuthMiddleware,
//     updateEmail
// );


// Delete email
emailRouter.delete(
    "/emails/:id",
    AuthMiddleware,
    deleteEmail
);


export default emailRouter;

