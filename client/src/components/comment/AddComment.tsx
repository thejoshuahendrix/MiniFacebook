import { useState } from 'react'
import { CheckSquare } from 'react-feather'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addComment } from '../../actions/commentActions'

interface Props {
    id: string;
    author: string;
    user: string;
}

const CommentInputWrapper = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: ${({ theme }) => theme.text.ternary};
    width: 100%;
    min-width: 400px;
    gap: 20px;
    color: ${({ theme }) => theme.text.secondary};
    border: 1px dotted rgba(0,0,0,.2);
    border-radius: ${({ theme }) => theme.card.borderRadius};
    padding:20px;
    height:20px;
    box-shadow: ${({ theme }) => theme.card.boxShadowSmall};
`
const AddCommentButton = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.text.secondary};
    border: 0;
    outline: 0;
    cursor: pointer;
`
const CommentInput = styled.input`
    background: transparent;
    color:${({ theme }) => theme.text.primary};
    border:0;
    font-family: "Inter";
    height:20px;
    border-left: 1px solid black;
    padding-left:5px;
    outline: none;
    &::active{
        outline: none;
    }
`

const AddComment = ({ id, author, user }: Props) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('')

    let comment = { user, author, content, postId: id }
    return (
        <CommentInputWrapper>

            <CommentInput
                placeholder="Add a comment..."
                type='text'
                name='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div className='tooltip'>
                <AddCommentButton
                    onClick={(e) => {
                        e.preventDefault();
                        addComment(comment)(dispatch);
                        setContent('')
                    }}>
                    <CheckSquare />
                </AddCommentButton>
                <span 
                style={{marginTop:'20px'}}
                className="tooltiptext"
                    onClick={(e) => {
                        e.preventDefault();
                        addComment(comment)(dispatch);
                        setContent('')
                    }}>
                    Add Comment
                </span>
            </div>
        </CommentInputWrapper>
    )
}

export default AddComment
