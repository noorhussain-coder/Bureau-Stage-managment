import mongoose from "mongoose";

const applicationProcessSchema = new mongoose.Schema(
  {
 status: {
  type: String,
  enum: [
    "pending",
    "inProcess",
    "approved",
    "rejected"
  ],
  default: "pending"
},

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    icon: {
      type: String,
      default: "FileText",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

applicationProcessSchema.index({ stepNumber: 1 });

const ApplicationProcess = mongoose.model(
  "ApplicationProcess",
  applicationProcessSchema
);

export default ApplicationProcess;