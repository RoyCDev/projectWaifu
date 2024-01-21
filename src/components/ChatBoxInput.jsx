import NameTag from "./NameTag"
import TextArea from "./TextArea";

function ChatBoxInput({ className, username, avatar, style, navActions, ...rest }) {
    return (
        <article className={className}>
            <img src={avatar} alt="" />
            <NameTag>{username}</NameTag>
            <TextArea style={style} rows={3}
                placeholder="<Type Something Here>"
                name="user2"
                {...rest}>

                <nav className="chatBoxNav">
                    <ul>
                        <li onClick={navActions.handleLogClick}>Chat History</li>
                        <li onClick={navActions.handleShopClick}>Shop</li>
                        <li>Preferences</li>
                    </ul>
                </nav>
            </TextArea>
        </article>
    )
}

export default ChatBoxInput;