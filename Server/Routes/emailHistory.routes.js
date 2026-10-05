import express from "express";

import {
  getEmailHistory,
  getSingleEmailHistory,
  deleteEmailHistory,
} from "../Controller/emailHistory.controller.js";

const router = express.Router();

router.get("/", getEmailHistory);

router.get("/:id", getSingleEmailHistory);

router.delete("/:id", deleteEmailHistory);

export default router;