import "./ChatBox.css"

function ChatBox({ className, ...rest }) {
    return (
        <div className={className}>
            <textarea rows="4" {...rest}></textarea >
        </div>
    )
}

export default ChatBox;