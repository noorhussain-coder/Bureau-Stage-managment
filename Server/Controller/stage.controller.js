
import Stage from "../model/stage.model.js";
import ErrorHandler from "../util/errorHandler.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

// CREATE STAGE
export const createStage = catchAsyncError(async (req, res, next) => {
    const {
        title,
        description,
        location,
        latitude,
        longitude,
        startTime,
        endTime,
        status
    } = req.body;

    // Check required fields
    if (
        !title ||
        !description ||
        !location ||
        latitude === undefined ||
        longitude === undefined ||
        !startTime ||
        !endTime
    ) {
        throw new ErrorHandler("Please fill all required fields", 400);
    }

    // Check end time
    if (new Date(endTime) <= new Date(startTime)) {
        throw new ErrorHandler(
            "End time must be after start time",
            400
        );
    }

    const stage = await Stage.create({
        title,
        description,
        location,
        latitude,
        longitude,
        startTime,
        endTime,
        status: status || "upcoming",
        createdBy: req.user._id
    });

    res.status(201).json({
        success: true,
        message: "Stage created successfully",
        stage
    });
});


// GET ALL STAGES
export const getStages = catchAsyncError(async (req, res, next) => {

    const stages = await Stage.find()
        .populate("createdBy", "name email")
        .sort({ startTime: 1 });

    res.status(200).json({
        success: true,
        count: stages.length,
        stages
    });
});


// GET SINGLE STAGE
export const getStage = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const stage = await Stage.findById(id)
        .populate("createdBy", "name email");

    if (!stage) {
        throw new ErrorHandler("Stage not found", 404);
    }

    res.status(200).json({
        success: true,
        stage
    });
});


// UPDATE STAGE
export const updateStage = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const {
        title,
        description,
        location,
        latitude,
        longitude,
        startTime,
        endTime,
        status
    } = req.body;

    const stage = await Stage.findById(id);

    if (!stage) {
        throw new ErrorHandler("Stage not found", 404);
    }

    // Update only provided fields
    if (title !== undefined) stage.title = title;
    if (description !== undefined) stage.description = description;
    if (location !== undefined) stage.location = location;
    if (latitude !== undefined) stage.latitude = latitude;
    if (longitude !== undefined) stage.longitude = longitude;
    if (startTime !== undefined) stage.startTime = startTime;
    if (endTime !== undefined) stage.endTime = endTime;
    if (status !== undefined) stage.status = status;

    // Check date after updating
    if (new Date(stage.endTime) <= new Date(stage.startTime)) {
        throw new ErrorHandler(
            "End time must be after start time",
            400
        );
    }

    await stage.save();

    res.status(200).json({
        success: true,
        message: "Stage updated successfully",
        stage
    });
});


// DELETE STAGE
export const deleteStage = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const stage = await Stage.findById(id);

    if (!stage) {
        throw new ErrorHandler("Stage not found", 404);
    }

    await Stage.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        message: "Stage deleted successfully"
    });
});

