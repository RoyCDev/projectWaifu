import "./NameTag.css"

function NameTag({ children, ...rest }) {
    return (
        <p className="nameTag" {...rest}>{children}</p >
    )
}

export default NameTag;