import React from 'react'
import './FriendsCard.css'
import './person.png'
const FriendsCard = (props) => {
    const {name,skills}=props;
   
  return (
    <div className='overall-card'>
                <div className='profile-and-info'>
                   
                    <div className='friends-wrapper'>
                    <div className='profile-background'></div>
                        <div className='name-and-skillsets'>
                            <h3>{name}</h3>
                            <div className='skills'>{(skills.map((skill,i)=>{
                                return <span><div className='skill-name'>{skill}</div>&nbsp; </span>
                            }))}</div>
                        </div>
                    </div>
                </div>
    </div>
    
  )
}

export default FriendsCard