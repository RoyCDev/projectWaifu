import NameTag from "./NameTag"
import Wrapper from "./Wrapper";

function ChatBox({ className, username, avatar, style, value }) {
    return (
        <article className={className}>
            <img src={avatar} alt="" />
            <NameTag>{username}</NameTag>
            <Wrapper style={style}> <div>{value}</div> </Wrapper>
        </article>
    )
}

export default ChatBox;