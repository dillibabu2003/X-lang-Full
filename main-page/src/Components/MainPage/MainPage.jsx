import React,{useState,useEffect} from 'react'
import './MainPage.css'
import ReactPlayer from 'react-player/youtube'
import getYouTubeID from 'get-youtube-id';



const MainPage = () => {
    const [inputtext,setInputtext]=useState("NOTHING");
    const [inputselect,setInputSelect]=useState("tamil");

   
    const [d,setData] = useState([{}])
    useEffect(()=>{
      fetch(inputselect+"/"+inputtext).then(
          res=>res.json()
      ).then(
          d =>{ 
            setData(d)
            console.log(d)
          }
      )
    },[inputtext,inputselect])
    const handleInputselectChange=(e)=>{
      setInputSelect(e.target.value);
    }
  
    const callApi=(e)=>{
      fetch(e.inputselect+"/"+e.inputtext).then(
          res=>res.json()
      ).then(
          d =>{ 
            setData(d)
            console.log(d)
          }
      )
    }

  
    const [youtubeVideo,setYoutubeVideo]=useState('');

    const [youtubeURL,setYoutubeURL]=useState('');
  
    const [errorMsg,setErrorMsg]=useState('');
    const handleYoutubeChange=(e)=>{
        setYoutubeVideo(e.target.value);
    }
    const handleYoutubeSubmit=(e)=>{
        e.preventDefault();
        const youtubeRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
        if(youtubeRegex.test(youtubeVideo)){
          setYoutubeURL(youtubeVideo);
 
          const id = getYouTubeID(youtubeVideo);
          setInputtext(id);
          setErrorMsg('');
        }
        else{
          setErrorMsg("Invalid Youtube URL");
        }
    }
  
    return (
      <>
      <div className='overall'>
        <div className="wrapper">
          <form  className="form-group">
            <input type="text" className='form-control' placeholder='Enter Youtube URL' required onChange={handleYoutubeChange}/>
            <button type='submit' className='upload-button' onClick={handleYoutubeSubmit}>UPLOAD</button>
          </form>
          {errorMsg &&<div className='error-msg'>{errorMsg}</div>}
          <br></br>
          <div className="youtube-box">
            <ReactPlayer url={youtubeURL} className='video'/>
          </div>
        </div>
        <div className='text-box'>
        <div className="languages-options-wrapper"onSubmit={callApi}>
        {/* <input className="InputBox" type='text' placeholder='code' onChange={handleInputtextChange} value={inputtext}/> */}
        <select name="languages" className='languages-options' onChange={handleInputselectChange} value={inputselect}>
            <option value="tamil">Tamil</option>
            <option value="english">English</option>
            <option value="malayalam">Malayalam</option>
            <option value="japanese">Japanese</option>
            <option value="french">French</option>
          </select>
          
        </div>
  
         <br/>
          <div className='description'>
        {
        (typeof d.tag === 'undefined')?(
        <p>Loading....</p>
        ) 
        :
        (
         (d.tag.map((tag,i)=>(
         <p key= {i}>{tag}</p>
         )))  
        )
      }
     </div>
        </div>
      </div>
      <div className="option-button">
          <div className="find-options">Find Job</div>
          <div className="find-options">Find friends</div>
          <div className="find-options">Find course</div>
     </div>
    </>
    )
}
export default MainPage;