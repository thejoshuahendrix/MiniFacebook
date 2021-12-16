import styled from 'styled-components'

const HomeWrapper = styled.div`
    background-color:  ${({ theme }) => theme.background.secondary};;
    min-height: 60vh;
    height: 100%;
    
    width: 90%;
    margin: auto;
    margin-top: 5%;
    color:  ${({ theme }) => theme.text.primary};
    border-radius: ${({theme})=> theme.card.borderRadius};
    box-shadow: ${({theme})=> theme.card.boxShadow};
`
const HomeTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: ${({theme})=> theme.card.borderRadius};
    text-align: center;
    box-shadow: ${({theme})=> theme.card.boxShadowSmall};
    width: 100%;
    margin-left: -40px;
    padding:40px;
    background-color:${({theme})=> theme.background.four};
`

const Home = () => {
    return (
        <HomeWrapper>
            <HomeTextWrapper id="main" ><h1 style={{}}>Welcome to the Main Page</h1></HomeTextWrapper>
        </HomeWrapper>
    )
}

export default Home
