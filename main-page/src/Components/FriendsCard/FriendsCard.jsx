import React from 'react'
import './FriendsCard.css'
const FriendsCard = (props) => {
    const {name,skills,val}=props;
   
  return (
    <div className='overall-card'>
        {
            (  Number(val)%2 === 0)?(
                <div className='profile-and-info'>
                    <div className='profile-background'></div>
                    <div className='friends-wrapper'>
                        <div className='name-and-skillsets'>
                            <h3>{name}</h3>
                            <div className='skills'>{(skills.map((skill,i)=>{
                                return <span><div className='skill-name'>{skill}</div>&nbsp; </span>
                            }))}</div>
                        </div>
                    </div>
                </div>
                ) 
                :
                (
                <div className='profile-and-info'>
                    <div className='friends-wrapper'>
                        <div className='name-and-skillsets'>  
                            <h3>{name}</h3>
                            <div className='skills'>{(skills.map((skill,i)=>{
                                return <span><div className='skill-name'>{skill}</div>&nbsp; </span>
                            }))}</div>
                        </div>
                    </div>
                    <div className='profile-background'></div>
                </div>
                )
         }
    </div>
    
  )
}

export default FriendsCard