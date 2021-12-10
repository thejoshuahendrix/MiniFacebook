import { useState } from "react";
import { CheckCircle } from "react-feather";
import styled from "styled-components";

const RegisterForm = styled.form`
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

const RegisterInput = styled.input`
    width: 30%;
    height: 50px;
    background: transparent;
    color:${({theme})=> theme.text.primary};
    border-left: .5px solid black;
    outline: none;
`

const RegisterButton = styled.button`
    outline: none;
    border: 0;
    background: transparent;
    color: ${({ theme }) => theme.text.secondary};
`

const Register = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = { name, password, email };
        fetch('http://localhost:5000/api/users/register', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then(async (res) => {
            if (res.status === 200) {
                setPassword('');
                window.location.replace('/login');
            }
            else { setError('Please enter all fields with valid input'); }
        })
    }

    return (
        <RegisterForm>
            Register
            <RegisterInput value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name..." />
            <RegisterInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password..." />
            <RegisterInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email.." />
            <div className='tooltip'>
            <RegisterButton onClick={(e) => handleSubmit(e)}><CheckCircle /></RegisterButton>
            <span className="tooltiptext" onClick={(e) => handleSubmit(e)}>Register</span>
            </div>
            {error}
        </RegisterForm>
    )
}

export default Register