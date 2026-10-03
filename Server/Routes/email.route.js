
import express from "express";

import {
    createEmail,
    getEmails,
    getEmail,
    updateEmail,
    deleteEmail
} from "../controllers/email.controller.js";

import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const emailRouter = express.Router();


// Create email
emailRouter.post(
    "/emails",
    AuthMiddleware,
    createEmail
);


// Get all emails
emailRouter.get(
    "/emails",
    AuthMiddleware,
    getEmails
);


// Get single email
emailRouter.get(
    "/emails/:id",
    AuthMiddleware,
    getEmail
);


// Update email
emailRouter.put(
    "/emails/:id",
    AuthMiddleware,
    updateEmail
);


// Delete email
emailRouter.delete(
    "/emails/:id",
    AuthMiddleware,
    deleteEmail
);


export default emailRouter;

