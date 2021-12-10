import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import LogoutButton from '../LogoutButton';
import { ToggleThemeButton } from '../ToggleThemeButton'
import Burger from './Burger';
import Menu from './Menu';

const TopBar = styled.div`
    height: 50px;
    background: ${({ theme }) => theme.background.primary};
    position: absolute;
    top: 0;
    color: ${({ theme }) => theme.text.primary};
    width: 100%;
    padding: 0.5rem 0 0 0;
    z-index: 20;
    box-shadow: ${({ theme }) => theme.card.boxShadow};
    
    a:visited{
        color: ${({ theme }) => theme.text.primary};
    }

`

export const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0px 5% 0px 5%;
    height: 50px;
    z-index: 120;
    
`
const Logo = styled.div`
    font-size: 30px;
    width: 50px;
    height: 40px;
    margin-bottom: 20px;
    a:hover{
        color: ${({ theme }) => theme.text.primary};
    }
`
export const LinkWrapper = styled.div`
    display:flex;
    justify-content: space-between;
    padding: .3rem 1rem 0rem 1rem;
    height: 50px;
    font-size: 24px;
    gap: 2rem;
    z-index: 120;
    a:hover{
        color: ${({ theme }) => theme.text.primary};
    }
`
export const ConnectButton = styled.button`
    opacity: .7;
    height:30px;
    margin-bottom: 20px;
    background: ${({ theme }) => theme.button.background}; 
    color: ${({ theme }) => theme.button.text}; 
    z-index: 120;
    border-radius: 25px;
`

export const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.background.secondary};
  height: 50vh;
  width: 25vw;
  text-align: center;
  z-index: inherit -1;
  padding: 2rem;
  position: absolute;
  top: 0px;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    font-size: 1rem;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.text.primary};
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: ${({ theme }) => theme.text.secondary};
    }
  }
`;

export const GradientWrap = styled.div`
    background: ${({ theme }) => theme.card.gradient}; 
    color: ${({ theme }) => theme.button.text}; 
    border-radius: 25px;
    height: 35px;
    font-size: 14px;
    font-weight: bolder;
    margin-top: -5px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 20px;
`
interface Props {
    themeChanger: () => void;
    isLoggedIn: boolean;

}

const Navbar = ({ themeChanger, isLoggedIn }: Props) => {
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(true);
    const theme = useTheme();
    const isDesktopOrLaptop = useMediaQuery({ query: `(min-width: ${theme.mobile})` })
    const isTabletOrMobile = useMediaQuery({ query: `(max-width: ${theme.mobile})` })

    return (
        <TopBar id="nav">
            <NavWrapper>
                <Logo><Link id="homelink" style={{ textDecoration: "none" }} to='/'>LOGO</Link>

                </Logo>
                <LinkWrapper>
                    <div style={{ fontSize: '14px' }}> Theme:</div>
                    <ToggleThemeButton onClick={() => { setToggle(!toggle); themeChanger() }} active={toggle}  ></ToggleThemeButton>

                    {isDesktopOrLaptop && <>
                        <Link id="contactlink" style={{ textDecoration: "none", fontSize: "20px" }} to='/contact'>Contact</Link>
                        <Link id="aboutlink" style={{ textDecoration: "none", fontSize: "20px" }} to='/about'>About</Link>
                        {isLoggedIn &&<Link id="postslink" style={{ textDecoration: "none", fontSize: "20px" }} to='/posts'>Posts</Link>}
                        {isLoggedIn &&<LogoutButton id="navlogoutbutton" />}
                        {!isLoggedIn && <Link id="loginlink" style={{ textDecoration: "none", fontSize: "20px" }} to='/login'>Login</Link>}
                        {!isLoggedIn && <Link id="registerlink" style={{ textDecoration: "none", fontSize: "20px" }} to='/register'>Register</Link>}
                    </>
                    }{isTabletOrMobile && <>
                        <Burger open={open} setOpen={setOpen} />
                        <Menu isLoggedIn={isLoggedIn} open={open} setOpen={setOpen} />
                    </>}
                </LinkWrapper>
            </NavWrapper>
        </TopBar >
    )
}

export default Navbar
