import mongoose from "mongoose";

const cronJobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    command: {
      type: String,
      required: true,
    },

    scheduleExpression: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "paused"],
      default: "active",
    },

    lastRunAt: {
      type: Date,
      default: null,
    },

    nextRunAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
cronJobSchema.index({ status: 1 });

export default mongoose.model("CronJob", cronJobSchema);
