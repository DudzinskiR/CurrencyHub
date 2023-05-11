import express from "express";
import ChangeDistributionController from "../modules/change-distribution/change-distribution.controller";
const router = express.Router();

router.get('/', ChangeDistributionController.getChangeDistribution)

export default router;