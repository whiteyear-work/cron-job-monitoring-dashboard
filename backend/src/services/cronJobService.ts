import { Request } from "express";
import CronJob from "../models/CronJob";

export const getCronJob = async (req: Request) => {
  const filter: any = {};

  const page = Number(req.query.page) || 1;
  const limit = Math.min(100, Number(req.query.limit) || 10); //to prevent spamming more than 100limit and crash
  const status = req.query.status || "active";

  let skip = (page - 1) * limit; //get 0*1 * 10, get from db records
  filter.status = status;

  const cronJobQuery = CronJob.find(filter)
    .select("name command scheduleExpression status lastRunAt nextRunAt")
    // .where("status")
    // .equals("active")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const totalJobsQuery = CronJob.countDocuments();

  const [cronJob, totalJobs] = await Promise.all([
    cronJobQuery,
    totalJobsQuery,
  ]);

  return {
    data: cronJob,
    pagination: {
      page,
      limit,
      totalJobs,
      totalPage: Math.ceil(totalJobs / limit),
    },
  };
};
