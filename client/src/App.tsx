import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/layout/Navbar';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { DarkTheme, LightTheme } from './themes';
import { useState } from 'react';
import Hero from './components/layout/Hero';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Home from './components/pages/Home';
import { AppWrapper } from "./components/AppWrapper";
import Footer from "./components/layout/Footer";
import Privacy from "./components/pages/Privacy";
import PostPage from "./components/pages/PostPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import jwt from 'jsonwebtoken';
import Chat from './components/pages/Chat';
let decoded: any = jwt.decode(localStorage.getItem('token') ?? "");
function App() {
  const [user] = useState(decoded ? decoded.username : "");
  const [isLoggedIn] = useState(decoded ? true : false);
  const [theme, setTheme] = useState<DefaultTheme>(DarkTheme);
  const changeTheme = () => {
    setTheme(theme === DarkTheme ? LightTheme : DarkTheme);
  };
  return (


    <ThemeProvider theme={theme}>
      <AppWrapper>
        <Router>
          <Navbar isLoggedIn={isLoggedIn} themeChanger={changeTheme} />
          <Hero />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/posts" element={<PostPage user={user} isLoggedIn={isLoggedIn} />} />
            <Route path="/chat" element={<Chat user={user}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>

          <Footer />
        </Router>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
