import BaseController from "./base.controller";
import { Comment, CommentI } from "../models/comment.model";
import { Request, Response } from 'express'
import { Post } from "../models/post.model";
import log from "../services/Logger";


export default class CommentController extends BaseController {

    constructor() {
        super(Comment)
    }

    post = async (req: Request, res: Response) => {
        try {
            const data = req.body
            const { postId } = data
            if (!postId) {
                res.status(400).send(`Error post id is required`)
            }
            const comment: CommentI = data
            const c: CommentI = {
                content: comment.content,
                author: comment.user,
                user: comment.user,
                postId: postId
            }
            const dbData = await Comment.create(c)
            const commentId = dbData._id
            const newPost = await Post.updateOne({ _id: postId }, { $push: { comments: [commentId] } })
            const out = {
                newPost,
                dbData
            }
            res.send(out);
            log.INFO('POST REQUEST SUCCESSFUL', out);
        } catch (error: any) {
            console.log(error.message)
            res.status(400).send(`Error in POST ${this.modelName}`)
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dbData = await Comment.deleteOne({ _id: id });
            res.send(dbData);

        } catch (error) {
            res.status(400).send(`Error in DELETE ${Comment.modelName}`);
        }
    }

}