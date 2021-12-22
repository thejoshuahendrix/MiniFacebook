import { User } from "../models/user.model";
import BaseController from "./base.controller";
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";
import Bcrypt from 'bcryptjs';
import log from "../services/Logger";

const generateAccessToken = (username: any) => {
    return jwt.sign(username, process.env.JWT_TOKEN || "d9fasjef", { expiresIn: "1800s" });
}

export const verifyToken = (req: any, res: any, next: NextFunction) => {
    //Get auth header
    const bearerHeader = req.headers["authorization"];
    console.log("Header", bearerHeader);
    //Check if bearer is undefined
    try {
        if (typeof bearerHeader !== undefined) {
            const bearer = bearerHeader.split(" ");
            //get token from array
            const bearerToken = bearer[1];
            //set the token
            req.token = bearerToken;
            jwt.verify(req.token, process.env.JWT_TOKEN || "d9fasjef", (err: any, data: any) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    res.user = data;
                    next();
                }
            });
        } else {
            //Forbidden
            res.sendStatus(403);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(403);
    }
}


export default class UserController extends BaseController {

    constructor() {
        super(User)
    }

    login = async (req: Request, res: Response) => {
        try {
            const user = await User.findOne({ name: req.body.name }).exec();
            if (!user) {
                return res.status(400).send({ message: "The username does not exist" });
            }
            if (!Bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(400).send({ message: "The password is invalid" });
            }
            //res.send("The username and password combination is correct!");
            //Auth JWT Somewhere here
            const token = generateAccessToken({
                username: req.body.name,
                role: user.role,
            });
            res.status(200).json(token);
            log.OK('Successfuly user logged in', req.body.name, user.password)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

    register = async (req: Request, res: Response) => {
        try {
            const userName = await User.findOne({ name: req.body.name }).exec();
            if (!userName) {
                req.body.password = Bcrypt.hashSync(req.body.password, 10);
                var user = new User(req.body);
                var result = await user.save();
                res.status(200).send(result);
                log.INFO('User created successfully', result)
            } else {
                res.status(400).send({ message: "User Already Exists" })
            }

        } catch (error) {
            res.status(500).send(error);
        }
    };

}