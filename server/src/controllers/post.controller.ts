import BaseController from './base.controller'
import { Post } from '../models/post.model'
import { Comment, CommentI } from "../models/comment.model";
import { Request, Response } from 'express';
import log from '../services/Logger';

export default class PostController extends BaseController {

    constructor() {
        super(Post)
    };
    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const post = await this.model.findById({ _id: id });
            const deletedComments = await Comment.deleteMany({ postId: id });
            const dbData = await this.model.deleteOne({ _id: id });
            res.send(dbData);

        } catch (error) {
            res.status(400).send(`Error in DELETE ${this.modelName}`);
        }
    };
    update = async (req: Request, res: Response) => {
        try {

            const data = req.body;
            const { id } = req.params;
            const dbData = await this.model.updateOne({ _id: id }, data);
            res.send(dbData);
            log.INFO('POST REQUEST SUCCESSFUL', 'UPDATED', dbData);
        } catch (error) {
            console.log(error);
            res.status(400).send(`Error in POST ${this.modelName}`);
        };
    };
};