import mongoose from "mongoose";
import dotenv from "dotenv";

import CronJob from "../models/CronJob";
import CronRun from "../models/CronRun";
import QueueJob from "../models/QueueJob";
import Alert from "../models/Alert";
import connectDB from "../config/db";

dotenv.config();

const seed = async () => {
  try {
    await connectDB(); 

    console.log("MongoDB connected");

    // clear old data
    await CronJob.deleteMany({});
    await CronRun.deleteMany({});
    await QueueJob.deleteMany({});
    await Alert.deleteMany({});

    // create cron jobs
    const cronJob1 = await CronJob.create({
      name: "Process Pending Bets",
      command: "process:bets",
      scheduleExpression: "*/5 * * * *",
      status: "active",
    });

    const cronJob2 = await CronJob.create({
      name: "Sync Provider Wallet",
      command: "sync:wallet",
      scheduleExpression: "*/1 * * * *",
      status: "active",
    });

    // create cron runs
    await CronRun.create([
      {
        cronJobId: cronJob1._id,
        status: "success",
        startedAt: new Date(),
        finishedAt: new Date(),
        durationMs: 1200,
        memoryMb: 128,
      },

      {
        cronJobId: cronJob1._id,
        status: "failed",
        startedAt: new Date(),
        finishedAt: new Date(),
        durationMs: 5320,
        memoryMb: 256,
        errorMessage: "Lock wait timeout exceeded",
      },

      {
        cronJobId: cronJob2._id,
        status: "running",
        startedAt: new Date(),
      },
    ]);

    // queue jobs
    await QueueJob.create([
      {
        queueName: "provider-sync",
        jobName: "Sync Pragmatic Bets",
        payload: {
          provider: "pragmatic",
          currency: "MYR",
        },
        status: "processing",
        attempts: 1,
        startedAt: new Date(),
      },

      {
        queueName: "provider-sync",
        jobName: "Sync Evolution Bets",
        payload: {
          provider: "evolution",
          currency: "USD",
        },
        status: "failed",
        attempts: 3,
        errorMessage: "API timeout",
      },
    ]);

    // alerts
    await Alert.create([
      {
        type: "cron_failed",
        severity: "critical",
        message: "Process Pending Bets failed multiple times",
      },

      {
        type: "queue_failed",
        severity: "warning",
        message: "Evolution queue job failed",
      },
    ]);

    console.log("Seed completed");

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seed();
