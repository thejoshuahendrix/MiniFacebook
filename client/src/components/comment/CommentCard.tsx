import moment from "moment"
import { XCircle } from "react-feather"
import { useDispatch } from "react-redux"
import styled from "styled-components"
import { deleteComment } from "../../actions/commentActions"

interface Props {
    content: string;
    author: string;
    user: string;
    updatedAt: string;
    id: string;
}

const CommentWrapper = styled.div`
    border: 1px dotted rgba(0,0,0,.4);
    background: ${({theme})=> theme.background.four};
    width: 95%;
    padding: 20px;
    border-radius: 5px;
    box-shadow: ${({theme})=> theme.card.boxShadowSmall};
`
const DeleteCommentButton = styled.button`
    background: transparent;
    border: 0;
    outline: 0;
    cursor: pointer;
    color: #6d1919;
`
const CommentCard = ({ user, content, author, updatedAt, id }: Props) => {
    const dispatch = useDispatch();
    return (
        <CommentWrapper>
            {author}
            {user === author &&
                <div style={{ float: 'right' }} className="tooltip">
                    <DeleteCommentButton
                        style={{ float: 'right' }}
                        onClick={() => deleteComment(id)(dispatch)}>
                        <XCircle />
                    </DeleteCommentButton>
                    <span
                        className="tooltiptext"
                        onClick={() => deleteComment(id)(dispatch)}>
                        Delete Comment</span>
                </div>
            }
            <p>{content}</p>
            {moment(updatedAt).fromNow()}

        </CommentWrapper>
    )
}

export default CommentCard
