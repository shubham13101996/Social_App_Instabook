import bcrypt from "bcrypt";

import User from "../models/User.js";
import jwt from "jsonwebtoken";

// REGISTER USER
export const register = async (req, res) => {
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // const salt = await bcrypt.genSalt();
    const HashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: HashedPassword,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
      message: "Error in Registering User",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "User doesn't exist" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    delete user.password;
    res.status(200).json({
      token,
      user,
      message: "User login Successfully",
    });
  } catch (error) {}
};
