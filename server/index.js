import express from "express";
import dotenv from "dotenv";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const testToken = jwt.sign(
  { id: 1,
    email: "test@example.com",
    role: "USER",
    first_name: "Test",
    last_name: "User"
 },   // 👈 IMPORTANT: must be userId
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

console.log("Test Token:", testToken);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/cart", cartRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});