import mongoose from "mongoose";

const cronRunSchema = new mongoose.Schema(
  {
    cronJobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CronJob",
      required: true,
    },

    status: {
      type: String,
      enum: ["running", "success", "failed"],
      required: true,
    },

    startedAt: Date,

    finishedAt: Date,

    durationMs: Number,

    memoryMb: Number,

    errorMessage: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

cronRunSchema.index({ cronJobId: 1, createdAt: -1 });
cronRunSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("CronRun", cronRunSchema);
