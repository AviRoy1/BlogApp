"use strict";
// import express, { Express, Request, Response } from "express";
// const port = 8000;
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./routes/User"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(morgan("dev"));
//  routes
app.use("/api", User_1.default);
let v = process.env.MONGODB_URL;
app.listen(process.env.PORT, async () => {
    await mongoose_1.default.connect(v);
    console.log(`MongoDB connected ${mongoose_1.default.connection.host}`);
    console.log(`Server is running on port- ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map