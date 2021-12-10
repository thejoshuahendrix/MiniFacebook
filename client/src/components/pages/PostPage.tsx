import React from 'react'
import AddPost from '../posts/AddPost'
import PostList from '../posts/PostList'


interface Props {
    isLoggedIn:boolean;
    user:string;
}

const PostPage = ({isLoggedIn, user}: Props) => {
    return (
        <div>
            {isLoggedIn &&<PostList user={user} />}
        </div>
    )
}

export default PostPage
