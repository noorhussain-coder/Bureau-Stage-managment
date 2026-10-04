
import express from "express";

import {
    createStage,
    getStages,
    getStage,
    updateStage,
    deleteStage
} from "../Controller/stage.controller.js";

import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const stagesRouter = express.Router();

// Create stage
stagesRouter.post("/create", AuthMiddleware, createStage);

// Get all stages
stagesRouter.get("/get", getStages);

// Get single stage
stagesRouter.get("/:id", getStage);

// Update stage
stagesRouter.put("/:id", AuthMiddleware, updateStage);

// Delete stage
stagesRouter.delete("/:id", AuthMiddleware, deleteStage);

export default stagesRouter;

