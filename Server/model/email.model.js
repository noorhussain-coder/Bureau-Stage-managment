import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true
    },

    to: {
      type: String,
      required: true,
      trim: true
    },

    subject: {
      type: String,
      required: true,
      trim: true
    },

    text: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending"
    },

    sentAt: {
      type: Date
    }
  },
  { timestamps: true }
);

const Email = mongoose.model("Email", emailSchema);

export default Email;