
import express from "express";

import {
    createApplication,
    getApplications,
    getApplication,
    getMyApplications,
    updateApplication,
    deleteApplication
} from "../controllers/application.controller.js";

import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const applicationRouter = express.Router();


// =====================================
// STUDENT
// =====================================

// Apply for a stage
applicationRouter.post(
    "/applications",
    AuthMiddleware,
    createApplication
);


// Get my applications
applicationRouter.get(
    "/applications/my",
    AuthMiddleware,
    getMyApplications
);


// =====================================
// ADMIN
// =====================================

// Get all applications
applicationRouter.get(
    "/applications",
    AuthMiddleware,
    getApplications
);


// Get single application
applicationRouter.get(
    "/applications/:id",
    AuthMiddleware,
    getApplication
);


// Update application
applicationRouter.put(
    "/applications/:id",
    AuthMiddleware,
    updateApplication
);


// Delete application
applicationRouter.delete(
    "/applications/:id",
    AuthMiddleware,
    deleteApplication
);


export default applicationRouter;

