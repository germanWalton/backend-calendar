import express from "express";
import { check } from "express-validator";
import fieldsValidator from "../middlewares/fieldsValidator.middleware.js";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller.js";
import validateJWT from "../middlewares/validate-jwt.middleware.js";
import isDate from "../helpers/isDate.js";

const router = express.Router();

router.use(validateJWT);

router.get("/", getEvents);

router.post(
  "/",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
    fieldsValidator,
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check("title", "The title is required").not().isEmpty(),
    check("start", "The start date is required").custom(isDate),
    check("end", "The end date is required").custom(isDate),
    fieldsValidator,
  ],
  updateEvent
);

router.delete("/:id", deleteEvent);

export default router;
