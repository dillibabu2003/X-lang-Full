import React from 'react'
import { useState,useEffect } from 'react'
import FriendsCard from '../FriendsCard/FriendsCard';
import Lottie from "lottie-react"
import animationData from './friends-animation.json'
import './FindFriends.css'

const FindFriends = () => {
    const [d,setData] = useState([{}]);
    const [inputselect,setInputSelect]=useState("Default");
    useEffect(()=>{
      fetch("frnd/"+inputselect).then(
          res=>res.json()
      ).then(
          d =>{ 
            setData(d)
            console.log(d)
          }
      )
    },[inputselect])
    const handleInputselectChange=(e)=>{
      setInputSelect(e.target.value);
    }
  
  return (
    <>
    <div className='title-and-animation'>
    <h1>Find Your Similar Friends</h1>
    <select name="languages" className='languages-options' onChange={handleInputselectChange} value={inputselect}>
            <option value="MachineLearning">Machine Learning</option>
            <option value="DataStructures">Data Structures</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Economics">Economics</option>
    </select>
    </div>
    <div className='animations-and-list'>
    <div><Lottie animationData={animationData}
    style={{
      height:600,
      width:600
    }}/></div>
    <div className='friends-list'>
    {
        (typeof d.Friends === 'undefined')?(
        <p>Loading....</p>
        ) 
        :
        (d.Friends.map((Friend,i)=>{
          return <FriendsCard name={Friend.USER} skills={Friend.SKILLSETS}/> 
       }))
      
      }
    </div>
    </div>
    </>
  )
}

export default FindFriends
