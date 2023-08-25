import React,{useState, useEffect} from 'react'
import "./Home.css";
function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  return (
    <div className='dabba'>
      <div className='dabba2'>
        <h1>Wellness Whisper</h1>
        <h4>Empowering Minds: Your Personal Mental Health<br></br>Chatbot - Talk, Type, Transform.</h4>
      </div>
      <div class="pos down-arrow abc" onClick={scrollToBottom} id='scrollButton'></div>
    </div>
  )
}

export default Home
