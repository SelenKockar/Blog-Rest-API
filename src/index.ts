import express, { Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes";
import postRouter from "./routes/post.routes";
import commentRouter from "./routes/comment.routes";

dotenv.config();

const app = express();
connectDB();
app.use(cookieParser());

app.get("/", async (_, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use(express.json({ limit: "10kb" }));
app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);

const port = 8080;

app.listen(port, () => {
  `Server on port: ${port}`;
});

export default app;
