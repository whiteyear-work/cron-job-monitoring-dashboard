import express from "express";
import {getDashboardStats} from '../services/dashboardService';

const router = express.Router();

router.get("/", async (req, res) => {
    const dashData = await getDashboardStats();
    return res.json(dashData);
});

export default router;
