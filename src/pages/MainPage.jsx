import { useState, useEffect } from "react";
import { apiRequest } from "../util";

import UserProfile from "../components/UserProfile";
import ChatBox from "../components/ChatBox";
import ChatBoxInput from "../components/ChatBoxInput";
import ChatHistory from "../components/ChatHistory";
import AiAvatar from "../assets/avatar/Ai.png"
import userAvatar from "../assets/avatar/User.png"
import "./MainPage.css"

function MainPage({ user, setUser, isLoggedIn, setIsLoggedIn }) {
    const [userQuery, setUserQuery] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);
    const [resObj, setResObj] = useState({ text: "" })
    const [dynamicRes, setDynamicRes] = useState();
    const [currentIndex, setCurrentIndex] = useState();

    const [showLog, setShowLog] = useState(false)
    const [log, setLog] = useState([])

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
        if (isLoggedIn) {
            setResObj({ text: await apiRequest("POST", `/api/ai/chat?input=${query}`, {}) });
        }
        else {
            setResObj({ text: "AI chat feature is currently unavailable. Please login to continue." });
        }
        setDynamicRes("");
        setCurrentIndex(0);

    }

    const handleLogClick = async () => {
        if (isLoggedIn) {
            if (!showLog) {    //request Chat History only if you're opening it
                setLog(await apiRequest("GET", "/api/user/data/history"));
            }
            setShowLog(prev => !prev);
        }
        else {
            setResObj({ text: "Chat history feature is currently unavailable. Please login to continue." });
            setDynamicRes("");
            setCurrentIndex(0);
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
            <UserProfile user={user} setUser={setUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <ChatBox lightOutline rows={3}
                className="user1" username="Gemini" avatar={AiAvatar}
                value={dynamicRes} />

            <ChatBoxInput lightOutline rows={3}
                className="user2" username={user.username} avatar={userAvatar}
                value={userQuery}
                readOnly={isReadOnly}
                onChange={handleChange}
                onKeyDown={handleEnter}
                onLogClick={handleLogClick} />

            {(isLoggedIn && showLog) && <ChatHistory log={log} setVis={setShowLog} username={user.username} />}
        </main>
    )
}

export default MainPage;