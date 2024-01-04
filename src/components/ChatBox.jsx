import NameTag from "./NameTag"
import TextArea from "./TextArea";

import classNames from "classnames";

function ChatBox({ className, user, avatar, light, lightOutline, dark, darkOutline, ...rest }) {
    const style = classNames({
        "light": light,
        "light-outline": lightOutline,
        "dark": dark,
        "dark-outline": darkOutline
    })

    return (
        <article className={className}>
            <img src={avatar} alt="" />
            <NameTag>{user}</NameTag>
            <TextArea readOnly className={style} {...rest} />
        </article>
    )
}

export default ChatBox;