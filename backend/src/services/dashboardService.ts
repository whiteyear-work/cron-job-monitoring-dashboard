import CronJob from "../models/CronJob";
import CronRun from "../models/CronRun";
import QueueJob from "../models/QueueJob";
import Alert from "../models/Alert";

export const getDashboardStats = async () => {
  const [
    totalCronJobs,
    failedCronRuns,
    runningCronRuns,
    pendingQueueJobs,
    failedQueueJobs,
    unresolvedAlerts,
  ] = await Promise.all([
    CronJob.countDocuments(),
    CronRun.countDocuments({ status: "failed" }),
    CronRun.countDocuments({ status: "running" }),
    QueueJob.countDocuments({ status: "pending" }),
    QueueJob.countDocuments({ status: "failed" }),
    Alert.countDocuments({ isResolved: false }),
  ]);

  return {
    totalCronJobs,
    failedCronRuns,
    runningCronRuns,
    pendingQueueJobs,
    failedQueueJobs,
    unresolvedAlerts,
  };
};
