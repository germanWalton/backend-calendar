import { response } from "express";
import { validationResult } from "express-validator"

const fieldsValidator = (req, res = response, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({
      ok: false,
      errors: errors.mapped(),
    });
  }
  next();
};

export default fieldsValidator