import * as mongoose from 'mongoose';

export interface PostI {
    content: string;
    author: string;
    imageURL?: string;
    comments: [];
    likes: [];
}

const PostSchema = new mongoose.Schema(
    {
        content: {
            type: String,
        },
        author: {
            type: String,
        },
        imageURL: {
            type: String,
        },
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'comments',
            },
        ],
        likes: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Post = mongoose.model('posts', PostSchema);
