import * as mongoose from "mongoose";

export interface PostI {
    content: string;
    author:string;
    imageURL?:string;
    comments: [];
}

const PostSchema = new mongoose.Schema({
    content: {
        type: String
    },
    author:{
        type:String
    },
    imageURL:{
        type:String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ]
}, {
    timestamps: true
});

export const Post = mongoose.model("posts", PostSchema);
