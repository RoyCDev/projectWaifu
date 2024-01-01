import { useState, useRef, useLayoutEffect } from "react"
import axios from "axios";

import ChatBox from "./ChatBox"
import NameTag from "./NameTag";
import AiAvatar from "../assets/avatar/guest.png"
import userAvatar from "../assets/avatar/guest.png"

import "./ChatHistory.css"

function ChatHistory({ log }) {
    const chatContent = useRef()

    useLayoutEffect(() => {
        setTimeout(() => chatContent.current.scrollTop = chatContent.current.scrollHeight, 50)
    }, [])

    const renderedLog = log.map((entry) => {
        return (
            <>
                <ChatBox light
                    className="past-convo u1" user="Gemini" avatar={AiAvatar}
                    value={entry.input} />

                {/* {entry.response && <ChatBox light
                    className="past-convo u2" user="Yahallo"
                    value={entry.response} />} */}

                <ChatBox light
                    className="past-convo u2" user="Yahallo" avatar={userAvatar}
                    value={entry.response} />
            </>
        )
    })

    return (
        <section className="log">
            <section className="log-header">
                <img src={AiAvatar} alt="" />
                <img src={userAvatar} alt="" />
                <NameTag>Chat History</NameTag>
            </section>

            <section className="log-content" ref={chatContent}>{renderedLog}</section>
        </section>
    )
}

export default ChatHistory