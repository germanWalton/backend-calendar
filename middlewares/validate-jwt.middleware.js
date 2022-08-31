import { response } from "express";
import jwt from "jsonwebtoken";

const validateJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).send({
      ok: false,
      msg: "There's no token in the request",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    req.name = name;
  } catch (e) {
    return res.status(401).send({
      ok: false,
      msg: " Invalid Token",
    });
  }
  next();
};

export default validateJWT;
