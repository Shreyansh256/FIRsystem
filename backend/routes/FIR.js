import express from "express";
import { registerFIR, fetchFIRs } from '../controllers/FIR.js';
import { isOfficer } from "../middlewares/OfficersMiddleware.js";

const router = express.Router();

router.post("/", registerFIR);
router.get("/fetchFIR", isOfficer, fetchFIRs);

export default router;