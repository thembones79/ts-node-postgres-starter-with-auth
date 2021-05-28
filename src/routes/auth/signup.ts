import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../../middlewares";
import { BadRequestError } from "../../errors";
import { UserRepo } from "../../repos/user-repo";
import { keys } from "../../config/keys";
import { Password } from "../../services/password";

const router = express.Router();

router.post(
  "/api/v1/users/signup",
  [
    body("email")
      .trim()
      .toLowerCase()
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("username")
      .trim()
      .isLength({ min: 2, max: 30 })
      .withMessage("Username must be between 2 and 40 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, username } = req.body;
    const existingUser = await UserRepo.findByEmail(email);
    if (existingUser) {
      throw new BadRequestError("Email in use", "email");
    }

    const hashed = await Password.toHash(password);
    const user = await UserRepo.insert({ email, password: hashed, username });

    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      keys.JWT_SECRET
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
