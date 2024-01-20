// userController.js
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import UserModel from "../model/userModel.js"; // Adjust the path based on your project structure
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the email is already registered
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });

  // Save the user to the database
  const savedUser = await newUser.save();

  res.status(201).json({ message: "user registered successfully!" });
});

// @desc    Log in user
// @route   POST /api/users/login
// @access  Public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await UserModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  // Generate and set the token as an HTTP cookie (you can use the generateToken function from the previous example)
  const token = generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    image: user.image,
    token,
  });
});

// @desc    Log out user
// @route   GET /api/users/logout
// @access  Private
const logoutUser = expressAsyncHandler(async (req, res) => {
  // Clear the token cookie
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (!user) {
    throw new Error("User not found");
  }

  // Update user profile
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.image = req.body.image || user.image;

  // Update password if provided
  if (req.body.password) {
    user.password = await bcrypt.hash(req.body.password, 10);
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    image: updatedUser.image,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (admin only, you can customize the access level)
const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await UserModel.findById(req.user._id);

  if (!user) {
    throw new Error("User not found");
  }
  res.clearCookie("token");
  await UserModel.deleteOne({ _id: user._id });

  res.status(200).json({ message: "User deleted successfully" });
});

export { registerUser, loginUser, logoutUser, updateUserProfile, deleteUser };
