import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
const MaybeShowNavBar = ({children}) => {
    const location=useLocation();
    const [showNavNar,setShowNavBar]=useState(false);
    useEffect(()=>{
      console.log("this is location:"+location)
      if(location.pathname==='/messaging' || location.pathname==='/chatbot' || location.pathname==='/mycourses' ||location.pathname=='/findcourse'){
        setShowNavBar(false);
      }else{
        setShowNavBar(true);
      }
    },[location])
  return (
    <div>{showNavNar&&children}</div>
  )
}
export default MaybeShowNavBar