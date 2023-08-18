import React from 'react'
import Lottie from "lottie-react"
import animationData from './course-animation.json'
const FindCourse = () => {
  return (
    <div className='overall'>
      <h1>Find your similar courses</h1>
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