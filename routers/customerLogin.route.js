import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import Customers from "../models/customer.model.js";
const router = express.Router();

// CUSTOMER LOGIN
router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    await Customers.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result === true) {
            const payload = {
              id: user._id,
              email: user.email,
              name: user.name,
            };

            const token = jwt.sign(payload, process.env.SECRET_KEY, {
              expiresIn: "15d",
            });

            return res.status(200).send({
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
