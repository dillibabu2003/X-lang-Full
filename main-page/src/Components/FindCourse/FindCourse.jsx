import React from 'react'
import Lottie from "lottie-react"
import animationData from './course-animation.json'
const FindCourse = () => {
  return (
    <div className='overall'>
      <div className='course-list'>
        <h1>Find your similar courses</h1>
        <iframe src="leetcode.com" height="500" width="900" title="Iframe Example"></iframe> 
      </div>
      <div>
      <Lottie animationData={animationData}
        style={{
          height:600,
          width:600
        }}/>
      </div>
      
      </div>
  )
}

export default FindCourse