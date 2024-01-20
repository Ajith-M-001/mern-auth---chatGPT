// server.js
import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./database/db.js";
import cookieParser from "cookie-parser";
import { errorHandler, notFoundHandler } from "./middleWare/errorHandler.js";
import router from "./router/userRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookies
app.use(cookieParser());

// Define your routes or additional middleware here

app.use("/api/v1/users", router);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Use the error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running on port http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error}`);
  }
};

// Call the function to start the server
startServer();
