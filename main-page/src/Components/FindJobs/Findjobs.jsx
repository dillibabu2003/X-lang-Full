import React,{useState,useEffect} from 'react'
import './Findjobs.css'
import './jobs.png'
import JobCard from '../JobCard/JobCard'
import Lottie from "lottie-react"
import animationData from './job-animation.json'

const Findjobs = () => {
  const [d,setData] = useState([{}])
   
    const [inputselect,setInputSelect]=useState("Agriculture");
    useEffect(()=>{
      fetch("job/"+inputselect).then(
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
      <h1>Find Your Similar Jobs</h1>
      <select name="languages" className='languages-options' onChange={handleInputselectChange} value={inputselect}>
              <option value="MachineLearning">Machine Learning</option>
              <option value="DataStructures">Data Structures</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Economics">Economics</option>
        </select>
        <div className='pannel-and-list'>
          <div className='quotes-and-picture'>
            <div className='quotes'>MAKE<br/>&nbsp; AN <br/>&nbsp; &nbsp;  EXPERIENCE<br/> &nbsp; &nbsp; &nbsp;&nbsp; BY<br/>&nbsp; &nbsp; &nbsp; &nbsp;  EXPLORING</div>
            <div className='job-image'><Lottie animationData={animationData}
            style={{height:500,width:500}}/></div>
            {/* <img src={require('./jobs.png')}  style={{width:'400px',height:'400px',borderBottomRightRadius:'20px',WebkitBorderBottomLeftRadius:'20px'}}></img> */}
          </div>
          <div className='jobs-list'>
          {
              (typeof d.JOBS === 'undefined')?(
              <p>Loading....</p>
              ) 
              :
              (d.JOBS.map((JOB,i)=>(
                        JOB.map((val,j)=>(
                          <JobCard companyDetails={val}/>
                        )
              ))))
            
            }
          </div>
      </div>
    </>
  )

}

export default Findjobs