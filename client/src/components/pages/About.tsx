import styled from 'styled-components'
import React from 'react'

const AboutWrapper = styled.div`
    color: ${({ theme }) => theme.text.secondary};
    width:80%;
    min-height: 60vh;
    height: 100%;
    padding:20px;
     margin:auto;
`

const About = () => {
    return (
        <AboutWrapper id="aboutwrapper">
            This is a website template, built by Joshua Hendrix. It is for easy grab and go setup. It has styled-components, react-router, cypress, docker, and themes already setup so you can hit the ground running!
        </AboutWrapper>
    )
}

export default About
