import React from 'react'
import './JobCard.css'

const JobCard = (props) => {
  const {companyDetails}=props
  return (
    <div className='company-card'>
        <div className='name-and-location'>
            <div className='main-details'>{companyDetails[0]}</div>
            <div className='main-details'>{companyDetails[1]}</div>
            <div className='main-details'>{companyDetails[3]}</div>
        </div>
        <div className='email-skillsets'>
          <div className='other-details'>
             <div className='info'>Email: {companyDetails[2]}</div>
             <div className='info'>Salary: {companyDetails[4]}</div>
          </div>
          <div className='other-details'>
             <div className='info'>Experience: {companyDetails[5]}</div>
             <div className='info'>Skills: {companyDetails[6]}</div>
          </div>
        </div>
    </div>
  ) 
}

export default JobCard