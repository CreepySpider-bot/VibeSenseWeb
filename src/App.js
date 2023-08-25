import React,{useState} from 'react';
import ChatApp from './Components/Chatroom/ChatApp';
import Navbar from './Components/Navbar/Navbar';
import App2 from './Components/App2';
const App = () => {
  return (
    <div>
      <Navbar/>
      <ChatApp/>
      {/* <App2/> */}
    </div>
  );
};
export default App;