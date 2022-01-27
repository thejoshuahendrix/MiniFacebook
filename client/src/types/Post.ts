export type Post = {
    _id?: string;
    content: string;
    author: string;
    imageURL?: string;
    comments?: [];
    createdAt?: string;
    likes?: string[];
    postId?: string;
};
