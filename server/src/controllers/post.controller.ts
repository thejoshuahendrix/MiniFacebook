import { Request, Response } from 'express';

import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';
import log from '../services/Logger';
import BaseController from './base.controller';

export default class PostController extends BaseController {
    constructor() {
        super(Post);
    }
    delete = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const post = await this.model.findById({ _id: id });
            const deletedComments = await Comment.deleteMany({ postId: id });
            const databaseData = await this.model.deleteOne({ _id: id });

            response.send(databaseData);
        } catch {
            response.status(400).send(`Error in DELETE ${this.modelName}`);
        }
    };
    update = async (request: Request, response: Response) => {
        try {
            const data = request.body;
            const { id } = request.params;
            const databaseData = await this.model.updateOne({ _id: id }, data);

            response.send(databaseData);
            log.INFO('POST REQUEST SUCCESSFUL', 'UPDATED', databaseData);
        } catch (error) {
            console.log(error);
            response.status(400).send(`Error in POST ${this.modelName}`);
        }
    };
}
