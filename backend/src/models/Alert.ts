import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },

    severity: {
      type: String,
      enum: ["info", "warning", "critical"],
      default: "info",
    },

    message: {
      type: String,
      required: true,
    },

    isResolved: {
      type: Boolean,
      default: false,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

alertSchema.index({ isResolved: 1, createdAt: -1 });
alertSchema.index({ severity: 1, createdAt: -1 });

export default mongoose.model("Alert", alertSchema);
