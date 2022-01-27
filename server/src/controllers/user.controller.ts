import Bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../models/user.model';
import log from '../services/Logger';
import BaseController from './base.controller';

const generateAccessToken = (username: any) => {
    return jwt.sign(username, process.env.JWT_TOKEN || 'd9fasjef', {
        expiresIn: '1800s',
    });
};

export const verifyToken = (
    request: any,
    response: any,
    next: NextFunction
) => {
    //Get auth header
    const bearerHeader = request.headers['authorization'];

    console.log('Header', bearerHeader);

    //Check if bearer is undefined
    try {
        if (typeof bearerHeader !== undefined) {
            const bearer = bearerHeader.split(' ');
            //get token from array
            const bearerToken = bearer.at(1);

            //set the token
            request.token = bearerToken;
            jwt.verify(
                request.token,
                process.env.JWT_TOKEN || 'd9fasjef',
                (error: any, data: any) => {
                    if (error) {
                        response.sendStatus(403);
                    } else {
                        response.user = data;
                        next();
                    }
                }
            );
        } else {
            //Forbidden
            response.sendStatus(403);
        }
    } catch (error) {
        console.log(error);
        response.sendStatus(403);
    }
};

export default class UserController extends BaseController {
    constructor() {
        super(User);
    }

    login = async (request: Request, response: Response) => {
        try {
            const user = await User.findOne({ name: request.body.name }).exec();

            if (!user) {
                return response
                    .status(400)
                    .send({ message: 'The username does not exist' });
            }

            if (!Bcrypt.compareSync(request.body.password, user.password)) {
                return response
                    .status(400)
                    .send({ message: 'The password is invalid' });
            }

            //res.send("The username and password combination is correct!");
            //Auth JWT Somewhere here
            const token = generateAccessToken({
                username: request.body.name,
                role: user.role,
            });

            response.status(200).json(token);
            log.OK(
                'Successfuly user logged in',
                request.body.name,
                user.password
            );
        } catch (error) {
            console.log(error);
            response.status(500).send(error);
        }
    };

    register = async (request: Request, response: Response) => {
        try {
            const userName = await User.findOne({
                name: request.body.name,
            }).exec();

            if (!userName) {
                request.body.password = Bcrypt.hashSync(
                    request.body.password,
                    10
                );
                const user = new User(request.body);
                const result = await user.save();

                response.status(200).send(result);
                log.INFO('User created successfully', result);
            } else {
                response.status(400).send({ message: 'User Already Exists' });
            }
        } catch (error) {
            response.status(500).send(error);
        }
    };
}
