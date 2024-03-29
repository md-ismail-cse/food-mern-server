import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import Users from "../models/user.model.js";
const router = express.Router();

// ADMIN LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Users.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            const payload = {
              id: user._id,
              email: user.email,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "7d",
            });

            return res.status(200).json({
              success: true,
              message: "User is logged in successfully",
              token: "Bearer " + token,
              id: user._id,
            });
          } else {
            res.json({ message: "Password doesn't match." });
          }
        });
      } else {
        res.json({ message: "Email doesn't exist." });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
export default router;
