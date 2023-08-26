
import React, { useState }from 'react'
import "./Text.css"
import { useSpeechSynthesis } from 'react-speech-kit';
function Text(props) {
    const [text,setText] = useState();
    const msg = props.words
    // if(msg!=""){
        console.log(msg);
    // }
    const {speak} = useSpeechSynthesis();
    const handleOnClick = () =>{
        speak({text:text})
    }
  return (
    <div>
      <h1>Text to Speech Converter</h1>
      <input className='input-area' placeholder='Enter your text here' onChange={(e)=>{setText(e.target.value)}}/>
      <button className='convert-btn' onClick={()=>{handleOnClick()}}>Convert</button>
    </div>
  )
}

export default Text
