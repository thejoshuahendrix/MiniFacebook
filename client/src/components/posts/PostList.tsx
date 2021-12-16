import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchPosts } from '../../actions/postActions'
import store from '../../store/createReduxStore'
import { Post } from '../../types/Post'
import AddPost from './AddPost'
import PostCard from './PostCard'

const PostListWrapper = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 10px 10px 10px rgba(0,0,0,.1);
    width: 100%;
    padding: 20px;
    gap:30px;
    min-height: 60vh;

`

interface Props {
    user:string;
}

const PostList = ({user}:Props) => {
    const state = store.getState()
    const dispatch = useDispatch();
    const posts = useSelector(fetchPosts)
    useLayoutEffect(() => {
        fetchPosts()(dispatch)
    }, [])
    return (
        <PostListWrapper>
            <AddPost user={user}/>
            
            {state.post.posts.sort((x:Post, y:Post) => new Date(y.createdAt||"").getTime() - +new Date(x.createdAt||"").getTime()).map((post: Post) => <PostCard imageURL={post.imageURL||""}user={user} id={post._id || ""} content={post.content} author={post.author} comments={post.comments || []} createdAt={post.createdAt || ""} />)}
        </PostListWrapper>
    )
}

export default PostList
