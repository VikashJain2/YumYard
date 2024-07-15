import express from "express";

import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import "dotenv/config";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import authMiddleware from "./middleware/auth.middleware.js";
import categoryRouter from "./routes/category.routes.js";
// App Config

const app = express();
const port = 4000;

// middleware

app.use(express.json());
app.use(cors());

// db connection

connectDB();

// api endpoints

app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/category",categoryRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});
app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
