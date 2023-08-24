
import "./App.css"
import MainPage from './Components/MainPage/MainPage';
import ChatBot from './Components/ChatBot/ChatBot';
import { Routes,Route } from 'react-router';
import NavBar from "./Components/NavBar/NavBar";
import MessagingApp from "./Components/LoginPage/LoginPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import ChannelListContainer from "./Components/msg_components/Channellistcontainer";
import './background.jpg'

function App(){

  return (    
  <div className="App">
    <LoginPage/>
  </div>
  )
}
export default App;