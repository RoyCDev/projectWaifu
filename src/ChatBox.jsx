import "./ChatBox.css"

function ChatBox({ className, showOption, ...rest }) {
    return (
        <div className={className}>
            <textarea rows="4" {...rest}></textarea >
            {/* {showOption && <p className="nav">hi</p>} */}
        </div>
    )
}

export default ChatBox;