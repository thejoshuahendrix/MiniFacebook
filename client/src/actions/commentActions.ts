import axios from 'axios';

import { Comment } from '../types/Comment';
import { fetchPosts } from './postActions';

export const deleteComment = (id: string) => (dispatch: any) => {
    axios
        .delete(`http://localhost:5000/api/comments/${id}`)
        .then((result) => fetchPosts()(dispatch));
};
export const addComment = (comment: Comment) => (dispatch: any) => {
    axios
        .post('http://localhost:5000/api/comments', comment)
        .then((result) => fetchPosts()(dispatch));
};
