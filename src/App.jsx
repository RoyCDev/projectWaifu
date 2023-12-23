import { useState, useEffect } from 'react'
import ChatBox from './ChatBox'
import NameTag from './NameTag';
import axios from 'axios';
import "./App.css"

function App() {
  const [userQuery, setUserQuery] = useState();
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [resObj, setResObj] = useState({ text: "" })
  const [dynamicRes, setDynamicRes] = useState();
  const [currentIndex, setCurrentIndex] = useState();

  const handleChange = (e) => {
    setUserQuery(e.target.value);
  }

  const handleSubmitOnEnter = (e) => {
    console.log(e);
    if (e.code === "Enter" && !isReadOnly && userQuery.trim()) {
      e.preventDefault();
      setIsReadOnly(true);
      chatWithAI(userQuery);
    }
  }

  const chatWithAI = async (query) => {
    const res = await axios.post(`http://13.52.216.11:8080/api/chat/AI?input=${query}`)
    setResObj({ text: res.data });
    setDynamicRes("");
    setCurrentIndex(0);
  }

  //Typewriter effect, no user typing during this
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
    <>
      <NameTag className="AiTag">Gemini</NameTag>
      <ChatBox className="AiChatBox" readOnly value={dynamicRes} />

      <br></br>
      <br></br>

      <NameTag className="userTag">Yahallo</NameTag>
      <ChatBox className="userChatBox"
        onChange={handleChange}
        onKeyPress={handleSubmitOnEnter}
        readOnly={isReadOnly}
        placeholder="<Type Something Here>"
        value={userQuery} />
    </>
  )
}

export default App
