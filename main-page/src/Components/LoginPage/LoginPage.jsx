
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';
import { Router,Routes,Route } from 'react-router';


import 'stream-chat-react/dist/css/index.css';
import './LoginPage.css';
import MessagingApp from '../MessagingApp/MessagingApp';
import {Auth } from '../msg_components';
import NavBar from '../NavBar/NavBar';
import MainPage from '../MainPage/MainPage';
import ChatBot from '../ChatBot/ChatBot';
import MaybeShowNavBar from '../MaybeShowNavBar/MaybeShowNavBar';

const cookies = new Cookies();

const apiKey = 's2x6d9jvbrgg';
const authToken = cookies.get("token");

const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}


const LoginPage = () => {
    if(!authToken) return <Auth />
    console.log(authToken);
    return (
        <>
           
            <MaybeShowNavBar>
               <NavBar/>
            </MaybeShowNavBar>
            {/* <div onClick={}>LogOut</div> */}
            <Routes>
                <Route path="/chatbot" element={<ChatBot/>}/>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/messaging" element={<MessagingApp/>}/>
                <Route path="/home" element={<MainPage/>}/>
            </Routes>
        
        </>
    );
}

export default LoginPage;