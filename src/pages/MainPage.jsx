import { useState, useEffect } from "react";
import axios from "axios";

import UserProfile from "../components/UserProfile";
import ChatBox from "../components/ChatBox";
import AiAvatar from "../assets/avatar/Ai.png"
import userAvatar from "../assets/avatar/User.png"
import "./MainPage.css"

function MainPage() {
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

            if (e.shiftKey) {
                setUserQuery(prevQuery => prevQuery + "\n");
            }

            else if (userQuery.trim() && !isReadOnly) {
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
            <ChatBox
                className="user1" user="Gemini" avatar={AiAvatar}
                value={dynamicRes}
                readOnly />

            <ChatBox
                className="user2" user="Yahallo" avatar={userAvatar}
                placeholder="<Type Something Here>"
                value={userQuery}
                readOnly={isReadOnly}
                onChange={handleChange}
                onKeyDown={handleEnter}
                showOption />
        </main>
    )
}

export default MainPage;