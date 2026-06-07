import express from "express";
import { getCronJob } from "../services/cronJobService";

const router = express.Router();

router.get("/", async (req, res) => {
  const cronJobs = await getCronJob(req);
  return res.json(cronJobs);
});

export default router;
