import "./ChatBox.css"

function ChatBox({ className, showOption, ...rest }) {
    return (
        <div className={className}>
            <textarea rows="3" {...rest}></textarea >
            {showOption &&
                <nav className="chatBoxNav">
                    <ul>
                        <li>Chat History</li>
                        <li>Shop</li>
                        <li>Preferences</li>
                    </ul>
                </nav>
            }
        </div>
    )
}

export default ChatBox;