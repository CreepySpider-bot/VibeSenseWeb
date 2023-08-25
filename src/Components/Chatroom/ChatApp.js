import React, { useState, useRef, useEffect } from 'react';
import './ChatApp.css'; // Import your CSS file for styling
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Micbtn from '../MicBtn/Micbtn';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ChatBubble = ({ text, isUser }) => (
  <div className={`chat-bubble ${isUser ? 'user' : 'bot'}`}>
    {text}
  </div>
);

const ChatContainer = ({ chatHistory }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when chat history updates
    chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="chat-container">
      {chatHistory.map((message, index) => (
        <ChatBubble
          key={index}
          text={message.text}
          isUser={message.isUser}
        />
      ))}
      <div ref={chatEndRef} />
      
    </div>
  );
};

const ChatApp = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [inputValue,setInputValue] = useState("");
  const [response, setResponse] = useState('');
  


  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    setInputValue(transcript);
  }, [transcript]);

  const handleUserMessage = async (userText) => {
    try {
      console.log("in try");
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: userText })
      });
      console.log("response",response);
  
      const data = await response.json();
      const aiResponse = data.aiResponse;
  
      resetTranscript();
  
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: userText, isUser: true },
        { text: aiResponse, isUser: false },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  

  // //////////////////////////////////////////////////


  const startSpeech = () => {
    SpeechRecognition.startListening();
    setInputValue(transcript)
    console.log(inputValue);
  }
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // const stopSpeech = () =>{
  //   SpeechRecognition.stopListening();
    // resetTranscript();
    // Generate the result and change the transcript to the result
    // if(transcript.split(" ")[0]=="male"){
    //   speak({text:transcript})
    // }else{
    //   speak({text:transcript , voice: voices[2]})
    // }
    

  // //////////////////////////////////////////////////
  
  return (
    <div className="chat-app">
      <div className='cont'>
        
          {/* ------------------------------------------ */}
          <ChatContainer chatHistory={chatHistory} />
      <div className='inp-button'>
      <label class="custom-field">
        <input type="text"
        placeholder="&nbsp;"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleUserMessage(e.target.value);
            setInputValue("")
          }
        }}/>
        <span class="placeholder">Enter Prompt</span>
      </label>
      {/* <input
      className='input'
        type="text"
        placeholder="Type your message..."
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleUserMessage(e.target.value);
            e.target.value = '';
          }
        }}
      /> */}

{inputValue ? (
          <button
            className="send-button"
            onClick={() => {
              handleUserMessage(inputValue);
              setInputValue('');
            }}
          >
            Send
          </button>
        ) : (
          // <button 
          //   className="microphone-button"
          //   onClick={startSpeech}
          // >🎤</button> display: flex; flex-direction: row; height: 100vh; align-items: center; justify-content: center;background:#1f1f28;
          <div class="container2">
            <div href="#" class="button active pushed mic2" onClick={startSpeech} id="pushed">
              <img className='mic' src='mic2.png'></img>
            </div>
            
          </div>

        )}
        {/* <button onClick={stopSpeech} className='stop'>Stop</button> */}
          {/* ------------------------------------------ */}
      </div>
      
      </div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>

    </div>
  );
};

export default ChatApp;
