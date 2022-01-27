import { Request, Response } from 'express';
import * as mongoose from 'mongoose';

import log from '../services/Logger';

export default class BaseController {
    model: mongoose.Model<any, any>;
    modelName: string;

    constructor(model: mongoose.Model<any, any>) {
        this.model = model;
        this.modelName = model.modelName;
    }

    post = async (request: Request, response: Response) => {
        try {
            const data = request.body;
            const databaseData = await this.model.create(data);

            response.send(databaseData);
            log.INFO('POST REQUEST SUCCESSFUL', databaseData);
        } catch (error) {
            console.log(error);
            response.status(400).send(`Error in POST ${this.modelName}`);
        }
    };

    get = async (request: Request, response: Response) => {
        try {
            const databaseData = await this.model.find().populate('comments');

            response.send(databaseData);
            log.INFO('GET REQUEST SUCCESSFUL');
        } catch {
            response.status(400).send(`Error in GET ${this.modelName}`);
        }
    };

    getById = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;

            const databaseData = await this.model.find({ _id: id });

            response.send(databaseData);
        } catch {
            response.status(400).send(`Error in GET ${this.modelName}`);
        }
    };

    delete = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const databaseData = await this.model.deleteOne({ _id: id });

            response.send(databaseData);
        } catch {
            response.status(400).send(`Error in DELETE ${this.modelName}`);
        }
    };
}
