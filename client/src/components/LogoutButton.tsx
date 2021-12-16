import React from 'react'
import { UserMinus } from 'react-feather';
import styled from 'styled-components';
const removeToken = () => {
    localStorage.clear();
    window.location.replace('/')
}
const LogoutBtn = styled.button`
    outline: none;
    border: 0;
    background: transparent;
    color: #6d1919;
    cursor: pointer;
`

const LogoutButton = ({id}:any) => {
    return (
        <div className="tooltip">
            <LogoutBtn id={id} onClick={removeToken}><UserMinus /></LogoutBtn>
            <span className="tooltiptext" onClick={removeToken}>Logout?</span>
        </div>
    )
}

export default LogoutButton
