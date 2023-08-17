import React from 'react'
import { useState,useEffect } from 'react'
import FriendsCard from '../FriendsCard/FriendsCard';

const FindFriends = () => {
    const [d,setData] = useState([{}]);
    let val=0; 
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
    <h1>Find Your Similar Friends</h1>
    <select name="languages" className='languages-options' onChange={handleInputselectChange} value={inputselect}>
            <option value="MachineLearning">Machine Learning</option>
            <option value="DataStructures">Data Structures</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Economics">Economics</option>
          </select>
    <div className='friends-list'>
    {
        (typeof d.Friends === 'undefined')?(
        <p>Loading....</p>
        ) 
        :
        (d.Friends.map((Friend,i)=>{
          val+=1;
          return <FriendsCard  val={val} name={Friend.USER} skills={Friend.SKILLSETS}/> 
       }))
      
      }
    </div>
    </>
  )
}

export default FindFriends



// (d.Friends.map((Friends,i)=>(
//     <div  key= {i}>{Friends}</div>
//     )))