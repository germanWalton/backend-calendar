import response from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import generateToken from "../helpers/jwt.js";

export const register = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        ok: false,
        message: "User already exist",
      });
    }

    user = new User(req.body);
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    const token = await generateToken(user.id, user.name)

    res.status(201).send({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
export const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({
        ok: false,
        message: "User not found",
      });
    }
    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      return res.status(400).send({
        ok: false,
        message: "Incorrect password",
      });
    }
    const token = await generateToken(user.id, user.name)

    return res.status(200).send({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

export const revalidateToken = async (req, res = response) => {

  const { uid, name } = req

  const token = await generateToken(uid, name)

  res.send({
    ok: true,
    token
  });
};
