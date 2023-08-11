import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
const MaybeShowLogout = ({children}) => {
    const location=useLocation();
    const [showNavNar,setShowNavBar]=useState(false);
    useEffect(()=>{
      console.log("this is location:"+location)
      if(location.pathname==='/messaging'){
        setShowNavBar(false);
      }else{
        setShowNavBar(true);
      }
    },[location])
  return (
    <div>{showNavNar&&children}</div>
  )
}

export default MaybeShowLogout