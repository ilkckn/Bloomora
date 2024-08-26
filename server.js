import express from "express";
import "express-async-errors";
import authRouter from "./routes/authRouter.js";
import connection from "./libs/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import productRouter from "./routes/productRouter.js";
import cartRouter from "./routes/cartRouter.js";
import wishListRouter from "./routes/wishListRouter.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import orderRouter from "./routes/orderRoute.js";
import userRouter from "./routes/userRouter.js";
import { fileURLToPath } from "url";
import path from "path";

await connection();

const app = express();

const __filename = fileURLToPath(import.meta.url); // Absolute path to the current file
const __dirname = path.dirname(__filename); // Directory name of the current file

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

app.use(cookieParser());
app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "client", "dist")));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/wishlist", wishListRouter);
app.use("/api/user", userRouter);

// Handle any other routes and serve the frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(errorHandlerMiddleware);
