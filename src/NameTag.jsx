import "./NameTag.css"

function NameTag({ children, className }) {
    return (
        <p className={className}> {children}</p >
    )
}

export default NameTag;