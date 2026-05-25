import mongoose from "mongoose";

const cronJobSchema = new mongoose.Schema(
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
    errorMessage: String,
  },
  { timestamps: true },
);

export default mongoose.model("CronJob", cronJobSchema);
