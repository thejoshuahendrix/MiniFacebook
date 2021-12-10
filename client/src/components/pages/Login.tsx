import React, { useState } from 'react'
import { CheckCircle } from 'react-feather'
import styled, { ThemeConsumer } from 'styled-components'

const LoginForm = styled.form`
   width:100%;
    height:100%;
    min-height:60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top:40px;
    gap: 20px;
    color:${({theme})=> theme.text.primary};
    background: ${({ theme }) => theme.background.secondary};
`

const LoginInput = styled.input`
    width: 30%;
    height: 50px;
    background: transparent;
    color:${({theme})=> theme.text.primary};
    border-left: 1px solid black;
    outline: none;
`
const LoginButton = styled.button`
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.text.secondary};
    border: 0;
`


const Login = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const user = { name, password };
        fetch('http://localhost:5000/api/users/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(async (res) => {
            let response = await res.json();
            if (res.status === 200) {
                localStorage.setItem("token", response);
                setPassword('');
                window.location.replace('/posts')
            }else{
                setError('Invalid Credentials');
            }

        })
    }


    return (
        <LoginForm>
            Login
            <LoginInput id="nameInput" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name..." />
            <LoginInput id="passwordInput" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." />
            <div className='tooltip'>
            <LoginButton id="loginButton" onClick={(e) => handleSubmit(e)}><CheckCircle /></LoginButton>
            <span className="tooltiptext" onClick={(e) => handleSubmit(e)}>Login</span>
            </div>
            {error}
        </LoginForm>
    )
}

export default Login
