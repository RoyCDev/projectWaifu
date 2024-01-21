import { useRef, useEffect, useLayoutEffect } from "react"
import { queryClient } from "../main";

// import { useInfiniteQuery } from "@tanstack/react-query";

import ChatBox from "./ChatBox"
import NameTag from "./NameTag";
import AiAvatar from "../assets/avatar/guest.png"
import userAvatar from "../assets/avatar/guest.png"

import "./ChatHistory.css"


function ChatHistory({ setVis, username }) {
    const logContainer = useRef();
    const logContent = useRef();
    const log = queryClient.getQueryData(["chat history"])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!logContainer.current.contains(e.target) && e.target.innerText !== "Chat History") {
                setVis(false);
            }
        }
        document.addEventListener("click", handleClickOutside, true);

        return () => document.removeEventListener("click", handleClickOutside, true);
    }, [])

    useLayoutEffect(() => {
        logContent.current.scrollTop = logContent.current.scrollHeight
        // setTimeout(() => chatContent.current.scrollTop = chatContent.current.scrollHeight, 50)
    }, [])

    const renderedLog = log.map((entry, i) => {
        return (
            <>
                <ChatBox style="light"
                    className="past-convo u2" username={username} avatar={userAvatar}
                    value={entry.input} />

                <ChatBox style="light"
                    className="past-convo u1" username="Gemini" avatar={AiAvatar}
                    value={entry.response} />
            </>
        )
    })

    return (
        <section className="log" ref={logContainer}>
            <section className="log-header">
                <img src={AiAvatar} alt="" />
                <img src={userAvatar} alt="" />
                <NameTag>Chat History</NameTag>
            </section>

            <section className="log-content" ref={logContent}>{renderedLog}</section>
        </section>
    )
}

export default ChatHistory