import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../../middlewares";
import { BadRequestError } from "../../errors";
import { UserRepo } from "../../repos/user-repo";
import { Password } from "../../services/password";
import { keys } from "../../config/keys";

const router = express.Router();

router.post(
  "/api/v1/users/login",
  [
    body("email")
      .trim()
      .toLowerCase()
      .isEmail()
      .withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await UserRepo.findByEmail(email);

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch: boolean = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
      },
      keys.JWT_SECRET
    );

    req.session = {
      jwt: userJwt,
    };

    delete existingUser.password;

    res.status(200).send(existingUser);
  }
);

export { router as loginRouter };
