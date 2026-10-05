import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ApplicationProcess from "../model/ApplicationProcess.model.js";
import ErrorHandler from "../util/errorHandler.js";


// =====================================================
// CREATE PROCESS STEP
// =====================================================

export const createProcessStep = catchAsyncError(
  async (req, res, next) => {
    const {
      stepNumber,
      title,
      description,
      icon,
      isActive,
    } = req.body;

    if (!stepNumber || !title || !description) {
      return next(
        new ErrorHandler(
          "Step number, title and description are required",
          400
        )
      );
    }

    const step = await ApplicationProcess.create({
      stepNumber: Number(stepNumber),
      title: title.trim(),
      description: description.trim(),
      icon: icon || "FileText",
      isActive:
        isActive === undefined
          ? true
          : isActive === true || isActive === "true",
    });

    res.status(201).json({
      success: true,
      message: "Application process step created successfully",
      step,
    });
  }
);


// =====================================================
// GET ALL PROCESS STEPS
// =====================================================

export const getProcessSteps = catchAsyncError(
  async (req, res) => {

    const steps = await ApplicationProcess.find()
      .sort({ stepNumber: 1 });

    res.status(200).json({
      success: true,
      steps,
    });
  }
);


// =====================================================
// GET ACTIVE PROCESS STEPS FOR USERS
// =====================================================

export const getActiveProcessSteps = catchAsyncError(
  async (req, res) => {

    const steps = await ApplicationProcess.find({
      isActive: true,
    }).sort({
      stepNumber: 1,
    });

    res.status(200).json({
      success: true,
      steps,
    });
  }
);


// =====================================================
// UPDATE PROCESS STEP
// =====================================================

export const updateProcessStep = catchAsyncError(
  async (req, res, next) => {

    const { id } = req.params;

    const {
      stepNumber,
      title,
      description,
      icon,
      isActive,
    } = req.body;

    const step =
      await ApplicationProcess.findById(id);

    if (!step) {
      return next(
        new ErrorHandler(
          "Application process step not found",
          404
        )
      );
    }

    if (stepNumber !== undefined) {
      step.stepNumber = Number(stepNumber);
    }

    if (title !== undefined) {
      step.title = title.trim();
    }

    if (description !== undefined) {
      step.description = description.trim();
    }

    if (icon !== undefined) {
      step.icon = icon;
    }

    if (isActive !== undefined) {
      step.isActive =
        isActive === true ||
        isActive === "true";
    }

    await step.save();

    res.status(200).json({
      success: true,
      message: "Application process updated successfully",
      step,
    });
  }
);


// =====================================================
// DELETE PROCESS STEP
// =====================================================

export const deleteProcessStep = catchAsyncError(
  async (req, res, next) => {

    const { id } = req.params;

    const step =
      await ApplicationProcess.findByIdAndDelete(id);

    if (!step) {
      return next(
        new ErrorHandler(
          "Application process step not found",
          404
        )
      );
    }

    res.status(200).json({
      success: true,
      message: "Application process step deleted successfully",
      step,
    });
  }
);


// =====================================================
// TOGGLE ACTIVE / INACTIVE
// =====================================================

export const toggleProcessStep = catchAsyncError(
  async (req, res, next) => {

    const { id } = req.params;

    const step =
      await ApplicationProcess.findById(id);

    if (!step) {
      return next(
        new ErrorHandler(
          "Application process step not found",
          404
        )
      );
    }

    step.isActive = !step.isActive;

    await step.save();

    res.status(200).json({
      success: true,
      message: step.isActive
        ? "Step activated successfully"
        : "Step deactivated successfully",
      step,
    });
  }
);