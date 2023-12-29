import NameTag from "./NameTag"
import TextArea from "./TextArea";

function ChatBox({ className, user, avatar, ...rest }) {
    return (
        <section className={className}>
            <img src={avatar} alt="" />
            <NameTag>{user}</NameTag>
            <TextArea {...rest}></TextArea>
        </section>
    )
}

export default ChatBox;