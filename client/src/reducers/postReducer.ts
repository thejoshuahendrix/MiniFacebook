import {
    ADD_POST,
    DELETE_POST,
    GET_POSTS,
    ITEMS_LOADING,
} from '../actions/types';
import { Post } from '../types/Post';

const initialState: { posts: Post[]; loading: boolean } = {
    posts: [],
    loading: false,
};

export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload
                ),
            };
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            };
        case ITEMS_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
