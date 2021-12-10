import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const BottomBar = styled.div`
    height:100px;
    bottom: 0;
    background-color: ${({theme})=> theme.background.secondary};
    margin-top: 50px;
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    justify-content: center;
    color: ${({theme})=> theme.text.primary};
    box-shadow: 20px 0 0 10px rgba(0,0,0,.1);
`
const FooterLinks = styled.div`
    color: ${({theme})=> theme.text.secondary};
    a{
        color: ${({theme})=> theme.text.secondary};
    }
`

const Footer = () => {
    return (
        <BottomBar>
            <FooterLinks>
                <Link id="privacylink" to='/privacy' >Privacy Policy</Link>
                 </FooterLinks>
            Hendrix Software &copy;Copyright 2021
        </BottomBar>
    )
}

export default Footer
