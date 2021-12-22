import CommentCard from "../comment/CommentCard"
import { Comment } from '../../types/Comment'
import AddComment from "../comment/AddComment"
import styled from "styled-components"
import { deletePost, fetchPosts, getPost } from "../../actions/postActions"
import { useDispatch } from "react-redux"
import moment from "moment"
import { Delete } from "react-feather"
import { FC, useState } from "react"
import LikeButton from "../LikeButton"
import axios from "axios"

interface Props {
    content: string;
    author: string;
    user: string;
    imageURL?: string;
    comments: Comment[];
    createdAt: string;
    id: string;
    like?: boolean;
    likes?: string[];
}
const CommentCardsWrapper = styled.div`
    width: 90%;
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`
const AddCommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-top: 40px;
`
const PostCardWrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background: ${({ theme }) => theme.background.secondary};
  min-height: 300px;
  min-width: 600px;
  max-width: 100%;
  padding: 20px;
  gap:10px;
  color: ${({ theme }) => theme.text.primary};
  border: 1px dotted rgba(0,0,0,.5);
  border-radius: ${({ theme }) => theme.card.borderRadius};
  box-shadow: ${({ theme }) => theme.card.boxShadowSmall};
`

const DateWrapper = styled.div`
display: flex;
justify-content: flex-end;
width: 100%;
`
const DescriptionWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
`
const DeleteButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;

`
const DeletePostButton = styled.button`
    background: transparent;
    outline: 0;
    border: 0;
    color: #6d1919;
    cursor: pointer;
`
const PostCard: FC<Props> = ({ user, author, content, comments, createdAt, id, imageURL, like, likes = [""] }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState('')
    const [isVideo, setIsVideo] = useState(imageURL && imageURL.includes('.mp4'));
    const handleDelete = (id: string) => {
        if (user === author) {
            deletePost(id)(dispatch)
        }
    }
    const clickLike = async () => {
        const post = {
            author, content, comments, postId: id, imageURL, likes: [...likes, user]

        }
        let res = await axios.post('http://localhost:5000/api/posts/' + id, post)
        fetchPosts()(dispatch)
    }
    const clickUnlike = async () => {
        const post = {
            author, content, comments, postId: id, imageURL, likes: [...likes.filter(like => like !== user)]

        }
        let res = await axios.post('http://localhost:5000/api/posts/' + id, post)
        fetchPosts()(dispatch)
    }
    return (
        <PostCardWrapper>
            {author}

            {user === author && <DeleteButtonWrapper>
                <div className="tooltip">
                    <DeletePostButton
                        onClick={() => handleDelete(id)}><Delete />
                    </DeletePostButton>
                    <span
                        className="tooltiptext"
                        onClick={() => handleDelete(id)}>
                        Delete Post
                    </span>
                </div>
            </DeleteButtonWrapper>}
            <DescriptionWrapper>{content}</DescriptionWrapper>
            {isVideo && <video
                style={{ boxShadow: "5px 5px 5px 2px rgba(0,0,0,.5)", maxWidth: '600px' }}
                controls>
                <source src={imageURL} />
            </video>}
            {imageURL && !isVideo && <img
                style={{ maxWidth: '600px' }}
                height="100%"
                src={imageURL} />}
            <DateWrapper>{moment(createdAt).fromNow()}</DateWrapper>
            <LikeButton likes={likes} like={like} likeOnClick={!like ? clickLike : clickUnlike} />
            <CommentCardsWrapper>
                {comments.map(comment => <CommentCard
                    id={comment._id || ''}
                    user={user}
                    author={comment.author}
                    content={comment.content}
                    updatedAt={comment.updatedAt || ""} />)}
            </CommentCardsWrapper>
            <AddCommentWrapper>
                <AddComment
                    user={user}
                    author={author}
                    id={id} />
            </AddCommentWrapper>
        </PostCardWrapper>
    )
}

export default PostCard
