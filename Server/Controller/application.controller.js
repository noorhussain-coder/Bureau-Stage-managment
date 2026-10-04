
import Application from "../model/application.model.js";
import ErrorHandler from "../util/errorHandler.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";


// =====================================
// CREATE APPLICATION
// =====================================

export const createApplication = catchAsyncError(
    async (req, res, next) => {

        const {
           
            stage,
            name,
            email,
            phone,
            department,
            semester,
            description
        } = req.body;

        const participant = req.user?._id;

        if (!participant) {
            throw new ErrorHandler(
                "User not authenticated",
                401
            );
        }

        if (
            !department||
            !semester||
            !description||
            !stage ||
            !name ||
            !email ||
            !phone
        ) {
            throw new ErrorHandler(
                "Please fill all required fields",
                400
            );
        }


        // Check if student already applied
        const existingApplication =
            await Application.findOne({
                participant,
               
            });

        if (existingApplication) {
            throw new ErrorHandler(
                "You have already applied for this stage",
                400
            );
        }


        const application = await Application.create({

            participant,
            stage,

            name,

            email,

            phone,
 department,
            semester,
            description,
            status: "pending"
        });


        res.status(201).json({

            success: true,

            message: "Application submitted successfully",

            application
        });
    }
);


// =====================================
// GET ALL APPLICATIONS
// ADMIN
// =====================================

export const getApplications = catchAsyncError(
    async (req, res, next) => {

        const applications = await Application.find()

            .populate(
                "participant",
                "name email Phone"
            )



            .populate(
                "stage",
                "title location startTime endTime status"
            )

            .sort({
                createdAt: -1
            });


        res.status(200).json({

            success: true,

            count: applications.length,

            applications
        });
    }
);


// =====================================
// GET SINGLE APPLICATION
// =====================================

export const getApplication = catchAsyncError(
    async (req, res, next) => {

        const application =
            await Application.findById(req.params.id)

                .populate(
                    "participant",
                    "name email Phone"
                )

            

                .populate(
                    "stage"
                );


        if (!application) {

            throw new ErrorHandler(
                "Application not found",
                404
            );
        }


        res.status(200).json({

            success: true,

            application
        });
    }
);


// =====================================
// GET MY APPLICATIONS
// STUDENT
// =====================================

export const getMyApplications = catchAsyncError(
    async (req, res, next) => {

        const applications =
            await Application.find({
                participant: req.user._id
            })

                // .populate(
                //     "announcement",
                //     "title applicationDeadline"
                // )

                .populate(
                    "stage",
                    "title location startTime endTime status"
                )

                .sort({
                    createdAt: -1
                });


        res.status(200).json({

            success: true,

            count: applications.length,

            applications
        });
    }
);


// =====================================
// UPDATE APPLICATION
// ADMIN
// =====================================

export const updateApplication = catchAsyncError(
    async (req, res, next) => {

        const application =
            await Application.findById(req.params.id);


        if (!application) {

            throw new ErrorHandler(
                "Application not found",
                404
            );
        }


        const {
            name,
            email,
            phone,
            status
        } = req.body;


        if (name !== undefined) {

            application.name = name;
        }


        if (email !== undefined) {

            application.email = email;
        }


        if (phone !== undefined) {

            application.phone = phone;
        }


        if (status !== undefined) {

            application.status = status;
        }


        await application.save();


        res.status(200).json({

            success: true,

            message: "Application updated successfully",

            application
        });
    }
);


// =====================================
// DELETE APPLICATION
// =====================================

export const deleteApplication = catchAsyncError(
    async (req, res, next) => {

        const application =
            await Application.findById(req.params.id);


        if (!application) {

            throw new ErrorHandler(
                "Application not found",
                404
            );
        }


        await Application.findByIdAndDelete(
            req.params.id
        );


        res.status(200).json({

            success: true,

            message: "Application deleted successfully"
        });
    }
);

