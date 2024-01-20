// verifyToken.js
import jwt from "jsonwebtoken";
import UserModel from "../model/userModel.js"; // Adjust the path based on your project structure

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    // Replace 'your-secret-key' with your actual secret key
    const secretKey = process.env.JWT_SECRET;

    const decoded = jwt.verify(token, secretKey);

    // Retrieve user information from MongoDB user model based on the decoded user ID
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized - Invalid token" });
    }

    // Attach user information to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

export default verifyToken;
