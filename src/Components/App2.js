import React,{useState} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
const App2 = () => {

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const {speak,voices} = useSpeechSynthesis();


  const startSpeech = () => SpeechRecognition.startListening({continuous: true})
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const stopSpeech = () =>{
    SpeechRecognition.stopListening();
    // Generate the result and change the transcript to the result
    if(transcript.split(" ")[0]=="male"){
      speak({text:transcript})
    }else{
      speak({text:transcript , voice: voices[2]})
    }
    
  }
  const resetSpeech = () =>{
    resetTranscript()
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={startSpeech}>Start</button>
      <button onClick={stopSpeech}>Stop and Generate Result</button>
      <button onClick={resetSpeech}>Reset</button>
      <p>{transcript}</p>
      <p>##################################################################################################</p>
      <div>
      <h1>Text to Speech Converter</h1>
      {/* <input className='input-area' placeholder='Enter your text here' onChange={(e)=>{setText(e.target.value)}}/> */}
      {/* <button className='convert-btn' onClick={()=>{handleOnClick()}}>Convert</button> */}
    </div>
    </div>
  );
};
export default App2;