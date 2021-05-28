import express from "express";
import { requireAuth } from "../../middlewares";
import { UserRepo } from "../../repos/user-repo";

const router = express.Router();

router.get("/api/v1/users/:id", requireAuth, async (req, res) => {
  const { id } = req.params;
  const users = await UserRepo.findById(id);
  res.send(users);
});

export { router as showUserRouter };
