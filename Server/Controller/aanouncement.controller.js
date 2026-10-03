import { catchAsyncError } from "../middleware/catchAsyncError.js";
import Announcement from "../model/announcement.model.js";
import ErrorHandler from "../util/errorHandler.js";


// CREATE
export const createAnnouncement = catchAsyncError(async (req, res, next) => {

    const {
        title,
        description,
        type,
        stage,
        applicationDeadline,
        requirements,
        isOpen
    } = req.body;

    if (
        !title ||
        !description ||
        !type ||
        !stage ||
        !applicationDeadline ||
        !requirements ||
        typeof isOpen === "undefined"
    ) {
        throw new ErrorHandler("Please fill all fields", 400);
    }

    if (!req.user) {
        throw new ErrorHandler("User not authenticated", 401);
    }

    const announcement = await Announcement.create({
        title,
        description,
        type,
        stage,
        applicationDeadline,
        requirements,
        createdBy: req.user._id,
        isOpen
    });

    res.status(201).json({
        success: true,
        message: "Announcement has been created",
        announcement
    });
});


// READ ALL
export const getAnnouncements = catchAsyncError(async (req, res, next) => {

    const announcements = await Announcement.find()
        .populate("createdBy", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        announcements
    });
});


// READ ONE
export const getAnnouncement = catchAsyncError(async (req, res, next) => {

    const announcement = await Announcement.findById(req.params.id)
        .populate("createdBy", "name email");

    if (!announcement) {
        throw new ErrorHandler("Announcement not found", 404);
    }

    res.status(200).json({
        success: true,
        announcement
    });
});


// UPDATE
export const updateAnnouncement = catchAsyncError(async (req, res, next) => {

    const {
        title,
        description,
        type,
        stage,
        applicationDeadline,
        requirements,
        isOpen
    } = req.body;

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
        throw new ErrorHandler("Announcement not found", 404);
    }

    announcement.title = title ?? announcement.title;
    announcement.description = description ?? announcement.description;
    announcement.type = type ?? announcement.type;
    announcement.stage = stage ?? announcement.stage;
    announcement.applicationDeadline =
        applicationDeadline ?? announcement.applicationDeadline;
    announcement.requirements =
        requirements ?? announcement.requirements;

    if (typeof isOpen !== "undefined") {
        announcement.isOpen = isOpen;
    }

    await announcement.save();

    res.status(200).json({
        success: true,
        message: "Announcement updated successfully",
        announcement
    });
});


// DELETE
export const deleteAnnouncement = catchAsyncError(async (req, res, next) => {

    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
        throw new ErrorHandler("Announcement not found", 404);
    }

    await announcement.deleteOne();

    res.status(200).json({
        success: true,
        message: "Announcement deleted successfully"
    });
});