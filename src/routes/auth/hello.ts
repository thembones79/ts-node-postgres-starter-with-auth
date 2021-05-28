import express from "express";
import { requireAuth } from "../../middlewares";

const router = express.Router();

router.get("/api/v1/users/hello", requireAuth, (req, res) => {
  res.send({ hi: "there" });
});

export { router as helloRouter };
