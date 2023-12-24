import { useState, useEffect } from 'react'
import ChatBox from './ChatBox'
import NameTag from './NameTag';
import axios from 'axios';
import avatar from "./assets/AI.png"
import "./App.css"

function App() {
  const [userQuery, setUserQuery] = useState();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [resObj, setResObj] = useState({ text: "" })
  const [dynamicRes, setDynamicRes] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  // Notes regarding handleChange and handleEnter
  // 1.         enter = submit input 
  //                    only if msg has content and not in ReadOnly mode
  // 2. shift + enter = go to next line 

  const handleChange = (e) => {
    setUserQuery(e.target.value);
  }

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      e.preventDefault()

      if (e.shiftKey) handleChange()

      else if (userQuery.trim() && !isReadOnly) {
        chatWithAI(userQuery);
      }
    }
  }

  const chatWithAI = async (query) => {
    setIsReadOnly(true);
    const res = await axios.post(`http://52.9.162.97:8080/api/chat/AI?input=${query}`)
    setResObj({ text: res.data });
    setDynamicRes("");
    setCurrentIndex(0);
  }

  // Typewriter effect, no user typing/submit during this
  useEffect(() => {
    if (currentIndex < resObj.text.length) {
      const timeout = setTimeout(() => {
        setDynamicRes(prevText => prevText + resObj.text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 15);

      return () => { clearTimeout(timeout) };
    }

    setUserQuery("");
    setIsReadOnly(false);

  }, [currentIndex]);

  return (
    <main className="chat">
      <section className="chat-container1">
        <img src={avatar} alt="AI avatar" />
        <NameTag className="AiTag">Gemini</NameTag>
        <ChatBox className="AiChatBox" readOnly value={dynamicRes} />
      </section>

      <section className="chat-container2">
        <NameTag className="userTag">Yahallo</NameTag>
        <ChatBox className="userChatBox" showOption
          onChange={handleChange}
          onKeyDown={handleEnter}
          readOnly={isReadOnly}
          placeholder="<Type Something Here>"
          value={userQuery} />
      </section>
    </main>
  )
}

export default App
