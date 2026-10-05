import mongoose from "mongoose";

const emailHistorySchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    senderEmail: {
      type: String,
      required: true,
    },

    recipients: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: false,
        },

        name: {
          type: String,
        },

        email: {
          type: String,
          required: true,
        },

        status: {
          type: String,
          enum: ["sent", "failed"],
          default: "sent",
        },

        error: {
          type: String,
          default: null,
        },
      },
    ],

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    emailType: {
      type: String,
      enum: [
        "general",
        "application",
        "announcement",
        "approval",
        "rejection",
        "stage",
        "notification",
      ],
      default: "general",
    },

    totalRecipients: {
      type: Number,
      default: 0,
    },

    sentCount: {
      type: Number,
      default: 0,
    },

    failedCount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["sent", "partial", "failed"],
      default: "sent",
    },
  },
  {
    timestamps: true,
  }
);

const EmailHistory = mongoose.model(
  "EmailHistory",
  emailHistorySchema
);

export default EmailHistory;