import { GET_POSTS, ADD_POST, DELETE_POST, ITEMS_LOADING, GET_POST } from "./types";
import { Post } from '../types/Post';
import axios from "axios";


export const fetchPosts = () => (dispatch: any) => {
  dispatch(setItemsLoading());
  axios.get("http://localhost:5000/api/posts").then((res) =>
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  );
};
export const getPost = (id: string) => (dispatch: any) => {
  dispatch(setItemsLoading());
  axios.get(`http://localhost:5000/api/posts/${id}`).then((res) =>
    dispatch({
      type: GET_POST,
      payload: res.data,
    })
  );
};
export const deletePost = (id: string) => (dispatch: any) => {
  axios.delete(`http://localhost:5000/api/posts/${id}`).then(res => dispatch({
    type: DELETE_POST,
    payload: id
  }))
};
export const addPost = (post: Post,) => (dispatch: any) => {
  axios.post('http://localhost:5000/api/posts', post)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
