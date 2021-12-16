import { DefaultTheme } from "styled-components"
import darkBackground from '../assets/background1.jpg'
import lightBackground from '../assets/background2.jpg'

export const DarkTheme: DefaultTheme = {
  text: {
    primary: '#ffffff',
    secondary: "#1b8af2",
    ternary: '#3f3f3f'
  },
  card: {
    borderRadius: '15px',
    boxShadow: '10px 10px 10px 10px rgba(0,0,0,.4)',
    boxShadowSmall: '4px 4px 4px 4px rgba(0,0,0,.4)',
    gradient: 'linear-gradient(151deg, rgba(0,100,100,1) 2%, rgba(0,165,254,1) 37%, rgba(120,1,245,1) 87%)'
  },
  button: {
    background: '#287021',
    text: '#121212'
  },
  background: {
    primary: '#121416',
    secondary: '#212c3b',
    ternary: "245245",
    image: darkBackground,
    four:"#181818"
  },
  mobile: '1000px'
}
export const LightTheme: DefaultTheme = {
  text: {
    primary: '#222222',
    secondary: '#CE2D4F',
    ternary: '#dddddd'
  },
  card: {
    borderRadius: '10px',
    boxShadow: '5px 10px 10px rgba(0,0,0,0.2), 5px 12px 12px rgba(0,0,0,0.2)',
    boxShadowSmall: '2px 2px 2px 2px rgba(0,0,0,.1)',
    gradient: 'linear-gradient(151deg, rgba(224,224,224,1) 5%, rgba(0,165,254,0.8037383177570093) 40%, rgba(125,2,255,1) 87%)'

  },
  button: {
    background: '#54e454',
    text: '#121212'
  },
  background: {
    primary: "#E5EBEA",
    secondary: '#F3F3F3',
    ternary: "#D4d4d4",
    image: lightBackground,
    four:"#9fb3b3"
  },
  mobile: '1000px'
}