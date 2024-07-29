import User from "../Models/User.js";
import supabase from "../supabaseClient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { email, username, password, role } = req.body;

  try {
    const userByEmail = await User.findOne({ email });
    if (userByEmail) {
      return res.status(400).json({ message: "This email is already in use" });
    }

    const userByUsername = await User.findOne({ username });
    if (userByUsername) {
      return res.status(400).json({ message: "This username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // Sign up with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
    });

    if (error) {
      return res
        .status(400)
        .json({ message: "Error signing up with Supabase" });
    }

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      role,
    });

    return res
      .status(201)
      .json({ message: "Registration successful! You may log in now." });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // const { user, error } = await supabase.auth.signInWithPassword({
    //   email,
    //   password,
    // });
    // if (error) {
    //   console.log(error.message);
    //   return res.status(400).json({ message: "Error signing in" });
    // }

    const dbUser = await User.findOne({ email });
    if (!dbUser) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { userId: dbUser._id, role: dbUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({ message: "Login successful", token, user: dbUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
