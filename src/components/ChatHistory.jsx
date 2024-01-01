import { useState, useRef, useLayoutEffect } from "react"
import axios from "axios";

import ChatBox from "./ChatBox"
import NameTag from "./NameTag";
import AiAvatar from "../assets/avatar/guest.png"
import userAvatar from "../assets/avatar/guest.png"

import "./ChatHistory.css"

function ChatHistory() {
    const chatContent = useRef()

    const [log, setLog] = useState([
        {
            "input": "hello there, Yahallo! ",
            "response": "What's up my."
        },

        {
            "input": "Just thinking about what you've been. You're as sweet as always! ",
            "response": "Gotta work on your rizz"
        },
        {
            "input": "Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. You're as sweet as always! Just thinking about what you've been. Just thinking about what you've been. You're as sweet as always! You're as sweet as always!",
            "response": "Gotta work on your rizz"
        },
        {
            "input": "gggggggggggggggggggggggggggggggggggggggggggggggg gggggggggggggggggggggggggggg ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
            "response": "Gotta work on your rizz"
        },

        {
            "input": "I'm sorry. I'll try a better job next time. Anyways, would you like your dinner? or your bath? or ... ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg ggggggggggggggggggggg",
        }
    ])

    const requestLog = async () => {
        setLog(await axios.get("http://52.9.162.97:8080/api/user/history"));
    }

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