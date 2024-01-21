import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { apiRequest, useLogFetch } from "../util";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

import UserProfile from "../components/UserProfile";
import ChatBox from "../components/ChatBox";
import ChatBoxInput from "../components/ChatBoxInput";
import ChatHistory from "../components/ChatHistory";
import AiAvatar from "../assets/avatar/Ai.png"
import userAvatar from "../assets/avatar/User.png"
import "./MainPage.css"

function MainPage({ user, isLoggedIn }) {
    const [userQuery, setUserQuery] = useState();
    const [isReadOnly, setIsReadOnly] = useState(false);

    const [res, setRes] = useState("")
    const [dynamicRes, setDynamicRes] = useState();
    const [currentIndex, setCurrentIndex] = useState();

    const [showLog, setShowLog] = useState(false)

    const runTypeEffect = (msg) => {
        setRes(msg);
        setDynamicRes("");
        setCurrentIndex(0);
    }

    // Notes regarding handleChange and handleEnter
    // 1.         enter = submit input 
    //                    only if msg has content and not in ReadOnly mode
    // 2. shift + enter = go to next line 

    const handleChange = (e) => setUserQuery(e.target.value);

    const handleEnter = (e) => {
        if (e.code === "Enter" && !isReadOnly) {
            e.preventDefault()
            if (e.shiftKey) setUserQuery(prevQuery => prevQuery + "\n");

            else if (userQuery.trim()) {
                setIsReadOnly(true)

                if (isLoggedIn) chatWithAi(userQuery);
                else runTypeEffect("AI chat feature is currently unavailable. Please login to continue.")
            }
        }
    }

    const { mutate: chatWithAi, isPending: isAiChatPending } = useMutation({
        mutationFn: async (query) => await apiRequest.post(`/api/ai/chat?input=${query}`),
        onSuccess: (res, query) => {
            queryClient.setQueryData(["chat history"], prev => ([...prev, { input: query, response: res.data }]));
            queryClient.setQueryData(["user"], prev => (
                {
                    ...prev,
                    total_messages: prev["total_messages"] + 1,
                    coins: prev["coins"] + 1
                }
            ));
            runTypeEffect(res.data || "No response.")
        }
    })

    const handleLogClick = () => {
        if (isLoggedIn) setShowLog(prev => !prev);
        else {
            setIsReadOnly(true)
            runTypeEffect("Chat history feature is currently unavailable. Please login to continue.");
        }
    }

    const navigate = useNavigate();
    const handleShopClick = () => {
        if (isLoggedIn) navigate("/shop")
        else {
            setIsReadOnly(true)
            runTypeEffect("Shop feature is currently unavailable. Please login to continue.");
        }
    }

    // Typewriter effect, no user typing/submit during this
    useEffect(() => {
        if (currentIndex < res.length) {
            const timeout = setTimeout(() => {
                setDynamicRes(prevText => prevText + res[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, 15);

            return () => { clearTimeout(timeout) };
        }

        setUserQuery("");
        setIsReadOnly(false);

    }, [currentIndex]);


    return (
        <main className="chat">
            <UserProfile user={user} isLoggedIn={isLoggedIn} />
            <ChatBox style="light-outline"
                className="user1" username="Gemini" avatar={AiAvatar}
                value={dynamicRes} />

            <ChatBoxInput style="light-outline"
                className="user2" username={user.username} avatar={userAvatar}
                value={userQuery}
                readOnly={isReadOnly}
                onChange={handleChange}
                onKeyDown={handleEnter}
                navActions={{ handleLogClick, handleShopClick }} />

            {(isLoggedIn && showLog) && <ChatHistory setVis={setShowLog} username={user.username} />}
        </main>
    )
}

export default MainPage;