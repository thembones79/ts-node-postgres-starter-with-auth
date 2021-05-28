import express from "express";

const router = express.Router();

router.get("/api/v1/users/currentuser", (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
