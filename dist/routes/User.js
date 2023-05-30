"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = __importDefault(require("joi"));
const userModels_1 = __importDefault(require("../models/userModels"));
const articles_1 = __importDefault(require("../models/articles"));
const joi_util_1 = require("../utils/joi.util");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const router = express_1.default.Router();
const signUpSchema = joi_1.default.object().keys({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    age: joi_1.default.number().required(),
    password: joi_1.default.string().required(),
});
router.post("/signup", async (req, res, next) => {
    try {
        req.body = await signUpSchema.validateAsync(req.body);
        next();
    }
    catch (err) {
        return res.status(422).json({ message: (0, joi_util_1.getErrorMessage)(err) });
    }
}, async (req, res) => {
    try {
        const { email, name, age, password } = req.body;
        const exisitingUser = await userModels_1.default.findOne({ email: email });
        if (exisitingUser) {
            return res
                .status(200)
                .send({ message: "User Already Exist", success: false });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModels_1.default(req.body);
        await newUser.save();
        res.status(201)
            .json({ message: "Sign Up Sucessfully", success: true });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
    }
});
const loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
router.get("/login", async (req, res, next) => {
    try {
        req.body = await loginSchema.validateAsync(req.body);
        next();
    }
    catch (err) {
        return res.status(422).json({ message: (0, joi_util_1.getErrorMessage)(err) });
    }
}, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModels_1.default.findOne({ email: email });
        if (!user) {
            return res
                .status(200)
                .send({ message: "Invlid Email or Password", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res
                .status(200)
                .send({ message: "Invlid Email or Password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        res
            .status(200)
            .send({ message: "Login Success", success: true, token, data: user });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
    }
});
const addArticlesSchema = joi_1.default.object().keys({
    // userId : joi.string().trim().required(),
    title: joi_1.default.string().trim().required(),
    description: joi_1.default.string().trim().required(),
});
router.post('/:userId/articles', userAuth_1.default, async (req, res, next) => {
    try {
        req.body = await addArticlesSchema.validateAsync(req.body);
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(422).json({ message: (0, joi_util_1.getErrorMessage)(error) });
    }
}, async (req, res) => {
    try {
        const { userId } = req.params;
        const { title, description } = req.body;
        const user = req.user;
        const newArticle = await articles_1.default.create({
            title: title,
            description: description,
            author: userId,
        });
        res
            .status(200)
            .send({ message: "Successfully created new Article", data: newArticle });
    }
    catch (err) {
    }
});
router.get('/articles', 
// userAuth,
async (req, res) => {
    try {
        const articles = await articles_1.default.find().populate("author", "name email age");
        res
            .status(200)
            .send({ message: "Successfully created new Article", data: articles });
    }
    catch (err) {
    }
});
exports.default = router;
//# sourceMappingURL=User.js.map