import React,{useState} from 'react';
import ChatApp from './Components/Chatroom/ChatApp';
import Navbar from './Components/Navbar/Navbar';
import App2 from './Components/App2';
import Micbtn from './Components/MicBtn/Micbtn';
import Home from './Components/Home/Home';
const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <ChatApp/>
      {/* <App2/> */}
    </div>
  );
};
export default App;