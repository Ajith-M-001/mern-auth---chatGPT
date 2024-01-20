// generateToken.js
import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  // Replace 'your-secret-key' with your actual secret key
  const secretKey = process.env.JWT_SECRET;

  // Replace 'your-expiry-time' with your desired expiration time (e.g., '1h' for 1 hour)
  const expiresIn = "1h";

  // Generate the token
  const token = jwt.sign({ userId }, secretKey, { expiresIn });

  // Set the token as an HTTP cookie
  res.cookie("token", token, {
    httpOnly: true, // Cannot be accessed via JavaScript
    secure: process.env.NODE_ENV === "production", // Send only over HTTPS in production
    sameSite: "Strict", // Cookies are sent only to the same site as the one that originated the request
    maxAge: 3600000, // Max age in milliseconds (e.g., 1 hour)
  });
};

export default generateToken;
