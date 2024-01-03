import { useState, useEffect } from "react";
import axios from "axios";

import UserProfile from "../components/UserProfile";
import ChatBox from "../components/ChatBox";
import ChatBoxInput from "../components/ChatBoxInput";
import ChatHistory from "../components/ChatHistory";
import AiAvatar from "../assets/avatar/Ai.png"
import userAvatar from "../assets/avatar/User.png"
import "./MainPage.css"

function MainPage() {
    const [userQuery, setUserQuery] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [resObj, setResObj] = useState({ text: "" })
    const [dynamicRes, setDynamicRes] = useState();
    const [currentIndex, setCurrentIndex] = useState();

    const [isLogVisible, setIsLogVisible] = useState(false)
    const [log, setLog] = useState([
        {
            "input": "hello there, Yahallo! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always! hello there, Yahallo! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always! hello there, Yahallo! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always! 123 ",
            "response": "What's up my. Just thinking about what you've been.  Just thinking about what you've been. "
        },

        {
            "input": "Just thinking about what you've been. You're as sweet as always!Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always!Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always!Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always!Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always!v ",
            "response": "Gotta work on your rizz"
        },
        {
            "input": "Just thinking about what you've been. You're as sweet as always! Just tgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggghinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always! gggggggggggggggggggggggggggggggggggggggggggggggg",
            "response": "Gotta work on your rizz"
        },
        {
            "input": "ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
            "response": "Gotta work on your rizz"
        },

        {
            "input": "I'm sorry. I'll try a better job next time. Anyways, would you like your dinner? or your bath? or ... ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg ggggggggggggggggggggg",
        }
    ])

    // Notes regarding handleChange and handleEnter
    // 1.         enter = submit input 
    //                    only if msg has content and not in ReadOnly mode
    // 2. shift + enter = go to next line 

    const handleChange = (e) => {
        setUserQuery(e.target.value);
    }

    const handleEnter = (e) => {
        if (e.code === "Enter" && !isReadOnly) {
            e.preventDefault()

            if (e.shiftKey) {
                setUserQuery(prevQuery => prevQuery + "\n");
            }

            else if (userQuery.trim()) {
                chatWithAi(userQuery);
            }
        }
    }

    const chatWithAi = async (query) => {
        setIsReadOnly(true);
        try {
            const res = await axios.post(`http://52.9.162.97:8080/api/chat/AI?input=${query}`, {}, {
                withCredentials: true,
            })
            setResObj({ text: res.data });
        }
        catch {
            setResObj({ text: "AI chat feature is currently unavailable. Please try again later." });
        }
        finally {
            setDynamicRes("");
            setCurrentIndex(0);
        }
    }

    const handleLogClick = async () => {
        setIsLogVisible(prev => !prev);
        if (!isLogVisible) {
            const res = await axios.get("http://52.9.162.97:8080/api/user/history", {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setLog(res.data);
        }
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
            <UserProfile />
            <ChatBox lightOutline rows={3}
                className="user1" user="Gemini" avatar={AiAvatar}
                value={dynamicRes} />

            <ChatBoxInput lightOutline rows={3}
                className="user2" user="Yahallo" avatar={userAvatar}
                value={userQuery}
                readOnly={isReadOnly}
                onChange={handleChange}
                onKeyDown={handleEnter}
                onLogClick={handleLogClick} />

            {isLogVisible && <ChatHistory log={log} setVis={setIsLogVisible} />}
        </main>
    )
}

export default MainPage;