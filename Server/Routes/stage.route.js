
import express from "express";

import {
    createStage,
    getStages,
    getStage,
    updateStage,
    deleteStage
} from "../controllers/stage.controller.js";

import { AuthMiddleware } from "../middleware/AuthMiddleware.js";

const stagesRouter = express.Router();

// Create stage
stagesRouter.post("/stages", AuthMiddleware, createStage);

// Get all stages
stagesRouter.get("/stages", getStages);

// Get single stage
stagesRouter.get("/stages/:id", getStage);

// Update stage
stagesRouter.put("/stages/:id", AuthMiddleware, updateStage);

// Delete stage
stagesRouter.delete("/stages/:id", AuthMiddleware, deleteStage);

export default stagesRouter;

