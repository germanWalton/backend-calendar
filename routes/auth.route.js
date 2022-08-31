import express from "express";
import { check } from "express-validator";
import {
  register,
  login,
  revalidateToken,
} from "../controllers/auth.controller.js";
import fieldsValidator from "../middlewares/fieldsValidator.middleware.js";
import validateJWT from "../middlewares/validate-jwt.middleware.js";

const router = express.Router();

router.post(
  "/new",
  [
    check("name", "The name is required").not().isEmpty(),
    check("email", "The email is required").isEmail(),
    check(
      "password",
      "The password is required and must have at least 6 cahracters"
    ).isLength({ min: 6 }),
    fieldsValidator,
  ],
  register
);
router.post(
  "/",
  [
    check("email", "The email is required").isEmail(),
    check(
      "password",
      "The password is required and must have at least 6 cahracters"
    ).isLength({ min: 6 }),
    fieldsValidator,
  ],
  login
);
router.get("/renew",validateJWT, revalidateToken);

export default router;
