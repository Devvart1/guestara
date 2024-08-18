import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);
//setting limit of request body to 16kb
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // use static assets from public dir
import categoryRouter from "./routes/category.route.js";
app.use("/api/v1/category", categoryRouter);
export { app };
