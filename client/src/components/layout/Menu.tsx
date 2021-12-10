import { StyledMenu } from './Navbar';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';

const Menu = ({ open, setOpen, isLoggedIn }: any) => {

    return (
        <StyledMenu id="burgermenu" open={open}>
            <Link style={{ textDecoration: "none" }} id="burgerhomelink" to='/'>Home</Link>
            <Link style={{ textDecoration: "none" }} id="burgercontactlink" to='/contact'>Contact</Link>
            <Link style={{ textDecoration: "none" }} id="burgeraboutlink" to='/about'>About</Link>

            {isLoggedIn && <Link id="burgerpostslink" style={{ textDecoration: "none"}} to='/posts'>Posts</Link>}
            {isLoggedIn &&<LogoutButton id="burgerlogoutbutton" />}
            {!isLoggedIn && <Link id="burgerloginlink" style={{ textDecoration: "none"}} to='/login'>Login</Link>}
            {!isLoggedIn && <Link id="burgerregisterlink" style={{ textDecoration: "none"}} to='/register'>Register</Link>}

        </StyledMenu>
    )
}
export default Menu;