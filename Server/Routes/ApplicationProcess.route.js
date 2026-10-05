import express from "express";

import {
  createProcessStep,
  getProcessSteps,
  getActiveProcessSteps,
  updateProcessStep,
  deleteProcessStep,
  toggleProcessStep,
} from "../Controller/ApplicationProcess.controller.js";

const router = express.Router();


// =====================================================
// ADMIN
// =====================================================

// Get all steps
router.get(
  "/application-process/admin",
  getProcessSteps
);

// Create step
router.post(
  "/application-process",
  createProcessStep
);

// Update step
router.put(
  "/application-process/:id",
  updateProcessStep
);

// Delete step
router.delete(
  "/application-process/:id",
  deleteProcessStep
);

// Activate / deactivate
router.patch(
  "/application-process/:id/toggle",
  toggleProcessStep
);


// =====================================================
// USER
// =====================================================

// Only active steps
router.get(
  "/application-process",
  getActiveProcessSteps
);


export default router;