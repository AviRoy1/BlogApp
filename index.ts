// import express, { Express, Request, Response } from "express";
// const port = 8000;

// const app: Express = express();

// app.get("/", (req: Request, res: Response) => {
//   res.send("HELLO FROM EXPRESS + TS!!!!");
// });

// app.get("/hi", (req: Request, res: Response) => {
//   res.send("BYEEE!!");
// });

// app.listen(port, () => {
//   console.log(`now listening on port ${port}`);
// });


import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import morgan from "morgan";
import colors from "colors";
import User from "./routes/User";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));

//  routes
app.use("/api", User);
let v: string = process.env.MONGODB_URL as string;
app.listen(process.env.PORT, async () => {
  await mongoose.connect(v);
  console.log(`MongoDB connected ${mongoose.connection.host}`);
  console.log(`Server is running on port- ${process.env.PORT}`);
});

