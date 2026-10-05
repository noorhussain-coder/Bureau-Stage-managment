import EmailHistory from "../model/EmailHistory.model.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../util/errorHandler.js";

/*
|--------------------------------------------------------------------------
| Get All Email History
|--------------------------------------------------------------------------
*/

export const getEmailHistory = catchAsyncError(async (req, res, next) => {
  const {
    search = "",
    status,
    emailType,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {};

  if (status) {
    query.status = status;
  }

  if (emailType) {
    query.emailType = emailType;
  }

  if (search) {
    query.$or = [
      {
        subject: {
          $regex: search,
          $options: "i",
        },
      },
      {
        senderEmail: {
          $regex: search,
          $options: "i",
        },
      },
      {
        "recipients.email": {
          $regex: search,
          $options: "i",
        },
      },
      {
        "recipients.name": {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [emails, total] = await Promise.all([
    EmailHistory.find(query)
      .populate("sender", "name email")
      .populate("recipients.user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),

    EmailHistory.countDocuments(query),
  ]);

  res.status(200).json({
    success: true,
    emails,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    },
  });
});

/*
|--------------------------------------------------------------------------
| Get Single Email
|--------------------------------------------------------------------------
*/

export const getSingleEmailHistory = catchAsyncError(
  async (req, res, next) => {
    const email = await EmailHistory.findById(req.params.id)
      .populate("sender", "name email")
      .populate("recipients.user", "name email");

    if (!email) {
      return next(
        new ErrorHandler("Email history not found", 404)
      );
    }

    res.status(200).json({
      success: true,
      email,
    });
  }
);

/*
|--------------------------------------------------------------------------
| Delete Email History
|--------------------------------------------------------------------------
*/

export const deleteEmailHistory = catchAsyncError(
  async (req, res, next) => {
    const email = await EmailHistory.findById(req.params.id);

    if (!email) {
      return next(
        new ErrorHandler("Email history not found", 404)
      );
    }

    await email.deleteOne();

    res.status(200).json({
      success: true,
      message: "Email history deleted successfully",
    });
  }
);