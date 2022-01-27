import { Request, Response } from 'express';

import { Comment, CommentI } from '../models/comment.model';
import { Post } from '../models/post.model';
import log from '../services/Logger';
import BaseController from './base.controller';

export default class CommentController extends BaseController {
    constructor() {
        super(Comment);
    }

    post = async (request: Request, response: Response) => {
        try {
            const data = request.body;
            const { postId } = data;

            if (!postId) {
                response.status(400).send('Error post id is required');
            }

            const comment: CommentI = data;
            const c: CommentI = {
                content: comment.content,
                author: comment.user,
                user: comment.user,
                postId: postId,
            };
            const databaseData = await Comment.create(c);
            const commentId = databaseData._id;
            const newPost = await Post.updateOne(
                { _id: postId },
                { $push: { comments: [commentId] } }
            );
            const out = {
                newPost,
                dbData: databaseData,
            };

            response.send(out);
            log.INFO('POST REQUEST SUCCESSFUL', out);
        } catch (error: any) {
            console.log(error.message);
            response.status(400).send(`Error in POST ${this.modelName}`);
        }
    };

    delete = async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const databaseData = await Comment.deleteOne({ _id: id });

            response.send(databaseData);
        } catch {
            response.status(400).send(`Error in DELETE ${Comment.modelName}`);
        }
    };
}
