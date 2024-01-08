import NameTag from "./NameTag"
import TextArea from "./TextArea";
import classNames from "classnames";

function ChatBoxInput({ className, username, avatar, light, lightOutline, dark, darkOutline, onLogClick, ...rest }) {
    const style = classNames({
        "light": light,
        "light-outline": lightOutline,
        "dark": dark,
        "dark-outline": darkOutline
    })

    return (
        <article className={className}>
            <img src={avatar} alt="" />
            <NameTag>{username}</NameTag>
            <TextArea className={style} placeholder="<Type Something Here>" {...rest}>
                <nav className="chatBoxNav">
                    <ul>
                        <li onClick={onLogClick}>Chat History</li>
                        <li>Shop</li>
                        <li>Preferences</li>
                    </ul>
                </nav>
            </TextArea>
        </article>
    )
}

export default ChatBoxInput;