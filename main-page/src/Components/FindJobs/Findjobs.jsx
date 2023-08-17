import React,{useState,useEffect} from 'react'
import './Findjobs.css'
import './jobs.png'

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
            <img src="jobs.png" alt='error'></img>
          </div>
          <div>
          {
              (typeof d.JOBS === 'undefined')?(
              <p>Loading....</p>
              ) 
              :
              (d.JOBS.map((JOB,i)=>(
                        JOB.map((val,j)=>(
                          <div>{val}</div>
                        )
              ))))
            
            }
          </div>
      </div>
    </>
  )

}

export default Findjobs