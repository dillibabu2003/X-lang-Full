import React from 'react'
import { useNavigate } from 'react-router';
import { redirect } from "react-router-dom";
import './NavBar.css'
import Cookies from 'universal-cookie';
import LogoutIcon from '../../assets/logout.png'


const NavBar = () => {
    const navigate=useNavigate('');

    const cookies = new Cookies();
    
    const openChatBot=()=>{
      return (
           navigate('/chatbot')
      )
    }
    const gotoHome=()=>{
        return(
            navigate('/home')
        )
    }
    const openMessagingApp=()=>{
      return(
        navigate('/messaging')
      )
    }
    const list=document.querySelectorAll('.list');
    function activeLink(){
      list.forEach((item)=>item.classList.remove('active'));
      this.classList.add('active');
    }
    list.forEach((item)=>item.addEventListener('click',activeLink));

    const logout = () => {
      cookies.remove("token");
      cookies.remove('userId');
      cookies.remove('username');
      cookies.remove('fullName');
      cookies.remove('avatarURL');
      cookies.remove('hashedPassword');
      cookies.remove('phoneNumber');
  
      window.location.reload();
  }
  const SideBar = ({ logout }) => (
  
     <div className="channel-list__sidebar__icon2">
       <div className="icon1__inner" onClick={logout}>
           <img src={LogoutIcon} alt="Logout" width="30" />
       </div>
     </div>
);


  return (
 <div className="head-bar">
      <div className="navigation">
        <ul>
            <li className="list active"onClick={gotoHome}>
                <a>
                <span className='icon'><svg width="40px" height="40px"xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256M400 179V64h-48v69" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg></span>
                  <span className='text'>Home</span>
                </a>
            </li>
            <li className="list">
                <a>
                  <span className='icon'><svg width="40px" height="40px"xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184 184-82.39 184-184S349.61 64 248 64z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M220 220h32v116"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M208 340h88"/><path d="M248 130a26 26 0 1026 26 26 26 0 00-26-26z"/></svg></span>
                  <span className='text'>About</span>
                </a>
            </li>
            <li className="list">
                <a>
                  <span className='icon'><svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/></svg></span>
                  <span className='text'>Contact</span>
                </a>
            </li>
            <li className="list" onClick={openChatBot}>
                <a>
                  <span className='icon'><svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M431 320.6c-1-3.6 1.2-8.6 3.3-12.2a33.68 33.68 0 012.1-3.1A162 162 0 00464 215c.3-92.2-77.5-167-173.7-167-83.9 0-153.9 57.1-170.3 132.9a160.7 160.7 0 00-3.7 34.2c0 92.3 74.8 169.1 171 169.1 15.3 0 35.9-4.6 47.2-7.7s22.5-7.2 25.4-8.3a26.44 26.44 0 019.3-1.7 26 26 0 0110.1 2l56.7 20.1a13.52 13.52 0 003.9 1 8 8 0 008-8 12.85 12.85 0 00-.5-2.7z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/><path d="M66.46 232a146.23 146.23 0 006.39 152.67c2.31 3.49 3.61 6.19 3.21 8s-11.93 61.87-11.93 61.87a8 8 0 002.71 7.68A8.17 8.17 0 0072 464a7.26 7.26 0 002.91-.6l56.21-22a15.7 15.7 0 0112 .2c18.94 7.38 39.88 12 60.83 12A159.21 159.21 0 00284 432.11" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"/></svg></span>
                  <span className='text'>Chatbot</span>
                </a>
            </li>
            <li className='list' onClick={openMessagingApp}>
                <a>
                  <span className='icon'><svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M408 64H104a56.16 56.16 0 00-56 56v192a56.16 56.16 0 0056 56h40v80l93.72-78.14a8 8 0 015.13-1.86H408a56.16 56.16 0 0056-56V120a56.16 56.16 0 00-56-56z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"/><circle cx="160" cy="216" r="32"/><circle cx="256" cy="216" r="32"/><circle cx="352" cy="216" r="32"/></svg></span>
                  <span className='text'>Message</span>
                </a>
            </li>
            <div className="indicator"></div>
        </ul>
        <div>
                 <SideBar logout={logout} />
        </div>
      </div>
      
    </div> 
  )
}

export default NavBar