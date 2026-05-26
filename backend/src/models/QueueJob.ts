import moongoose from "mongoose";

const queueJobSchema = new moongoose.Schema(
  {
    queueName: {
      type: String,
      required: true,
    },

    jobName: {
      type: String,
      required: true,
    },

    payload: {
      type: Object,
      default: {},
    },

    status: {
      type: String,
      enum: ["pending", "processing", "success", "failed"],
      default: "pending",
    },

    attempts: {
      type: Number,
      default: 0,
    },

    startedAt: {
      type: Date,
      default: null,
    },

    finishedAt: {
      type: Date,
      default: null,
    },

    errorMessage: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

queueJobSchema.index({ status: 1, createdAt: -1 });
queueJobSchema.index({ queueName: 1, status: 1 });

export default moongoose.model("QueueJob", queueJobSchema);
