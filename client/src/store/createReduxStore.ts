import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import postReducer from '../reducers';

const initialState = {};

const middleWare = [thunk];

// declare global {
//     interface Window {
//       __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    postReducer,
    initialState,
    applyMiddleware(...middleWare)
);

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
