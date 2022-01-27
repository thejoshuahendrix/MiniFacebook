import axios from 'axios';

import { Post } from '../types/Post';
import {
    ADD_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    ITEMS_LOADING,
} from './types';

export const fetchPosts = () => (dispatch: any) => {
    dispatch(setItemsLoading());
    axios.get('http://localhost:5000/api/posts').then((response) =>
        dispatch({
            type: GET_POSTS,
            payload: response.data,
        })
    );
};
export const getPost = (id: string) => (dispatch: any) => {
    dispatch(setItemsLoading());
    axios.get(`http://localhost:5000/api/posts/${id}`).then((response) =>
        dispatch({
            type: GET_POST,
            payload: response.data,
        })
    );
};
export const deletePost = (id: string) => (dispatch: any) => {
    axios.delete(`http://localhost:5000/api/posts/${id}`).then((response) =>
        dispatch({
            type: DELETE_POST,
            payload: id,
        })
    );
};
export const addPost = (post: Post) => (dispatch: any) => {
    axios.post('http://localhost:5000/api/posts', post).then((response) =>
        dispatch({
            type: ADD_POST,
            payload: response.data,
        })
    );
};
export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING,
    };
};
