import axios from 'axios'
import { useState } from 'react'
import { CheckCircle } from 'react-feather'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { addPost } from '../../actions/postActions'


const AddPostForm = styled.form`
    background: ${({ theme }) => theme.background.secondary};
    border-radius:  ${({ theme }) => theme.card.borderRadius};
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.text.secondary};
    min-height: 80px;
`
const AddPostButton = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.text.secondary};
    border-radius: ${({ theme }) => theme.card.borderRadius};
    outline: 0;
    border: 0;

`
const PostInput = styled.input`
color:${({ theme }) => theme.text.primary};
background: transparent;
    width:40%;
    border: 0;
    border-left: 1px solid black;
    min-height: 40px;
    outline: none;
    &:active{
        border: 0;
        border-left: 1px solid black;
        outline: none;
    }
`

const FileUploader = styled.input`
    
`

interface Props {
    user: string;
}



const AddPost = ({ user }: Props) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('')
    const [file, setFile] = useState('')
    const [filename, setFileName] = useState('Select file...')

    const fileOnChange = (e: any) => {
        setFile(e.target.files[0])
        setFileName(e.target.files[0].name)

    }
    const onSubmit = async () => {
        if (file) {
            let formData = new FormData();
            formData.append('file', file);
            const res = await axios.post('http://localhost:5000/uploads', formData, {
                headers: {
                    'Content-Types': 'multipart/form-data'
                }
            })
            let post = { content, author: user, imageURL: res.data.filePath }
            addPost(post)(dispatch); setContent('');
        } else {
            let post = { content, author: user, imageURL: "" }
            addPost(post)(dispatch); setContent('');
        }


    }



    return (
        <>
            <AddPostForm id="Post-form">
                <PostInput id="addpostInput" placeholder="Whats on your mind?.. " type='text' name='content' value={content} onChange={(e) => setContent(e.target.value)} />
                <FileUploader type='file' onChange={(e) => fileOnChange(e)} id='customFile' /><label htmlFor='customFile'>{filename}</label>
                <div className='tooltip'>
                    <AddPostButton id="addpostButton" onClick={(e) => { e.preventDefault(); onSubmit() }}><CheckCircle /></AddPostButton>
                    <span className="tooltiptext" onClick={(e) => { e.preventDefault(); onSubmit() }}>Add Post</span>
                </div>
            </AddPostForm>
        </>
    )
}

export default AddPost
