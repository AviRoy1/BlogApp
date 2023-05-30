import express from 'express';
import mongoose from 'mongoose';
import joi from "joi";
import User from '../models/userModels';
import Article from '../models/articles';
import { getErrorMessage } from "../utils/joi.util";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import userAuth from '../middlewares/userAuth';

const router = express.Router();

const signUpSchema = joi.object().keys({
    name: joi.string().required(),
    email: joi.string().required(),
    age: joi.number().required(),
    password: joi.string().required(),
});
router.post(
    "/signup",
    async(req,res,next) => {
        try {
            req.body = await signUpSchema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(422).json({ message: getErrorMessage(err) });
        }
    },

    async(req: any, res) => {
        try {
            const {email, name, age, password} = req.body;
            const exisitingUser = await User.findOne({ email: email });
            if (exisitingUser) {
              return res
                .status(200)
                .send({ message: "User Already Exist", success: false });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            req.body.password = hashedPassword;
            const newUser = new User(req.body);
            await newUser.save();
            res.status(201)
            .json({ message: "Sign Up Sucessfully", success: true });
        } catch (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
    }
)


const loginSchema = joi.object().keys({
    email: joi.string().required(),
    password: joi.string().required(),
});
router.get(
    "/login",
    async(req,res,next) => {
        try {
            req.body = await loginSchema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(422).json({ message: getErrorMessage(err) });
        }
    },
    async(req: any, res) => {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({ email: email });
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
    }
);

const addArticlesSchema = joi.object().keys({
    // userId : joi.string().trim().required(),
    title:  joi.string().trim().required(),
    description: joi.string().trim().required(),
});
router.post(
    '/:userId/articles',
    userAuth,
    async (req, res, next) => {
        try {
          req.body = await addArticlesSchema.validateAsync(req.body);
          next();
        } catch (error) {
          console.log(error);
          return res.status(422).json({ message: getErrorMessage(error) });
        }
    },
    async (req: any, res) => {
        try{
            const {userId} = req.params
            const { title, description} = req.body;
            const user = req.user;
            const newArticle = await Article.create({
                title:title,
                description: description,
                author: userId,
            });
            res
            .status(200)
            .send({ message: "Successfully created new Article", data: newArticle });
        }catch (err) {

        }
    }
);


router.get(
    '/articles',
    userAuth,
    async (req: any, res) => {
        try{
            const articles = await Article.find().populate("author","name email age");
            res
            .status(200)
            .send({ data: articles });
        }catch (err) {

        }
    }
);

const updateprofileSchema = joi.object().keys({
    name: joi.string().trim(),
    age: joi.number(),
});
router.post(
    "/users/:userId",
    async(req,res,next) => {
        try {
            req.body = await updateprofileSchema.validateAsync(req.body);
            next();
        } catch (err) {
            return res.status(422).json({ message: getErrorMessage(err) });
        }
    },
    async(req: any, res) => {
        try {
            const userId = req.params;
            const {name, age} = req.body;
            const user = await User.findById(userId);
            if (!user) {
            return res
                .status(200)
                .send({ message: "User not found!", success: false });
            }
            if(age) {
                user.age = age;
            }
            if(name) {
                user.name = name;
            }
            await user.save();
            res
            .status(200)
            .send({ message: "Update Success", success: true, data: user });
        } 
        catch (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
    }
);


export default router;