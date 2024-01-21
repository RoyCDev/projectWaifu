import Wrapper from "./Wrapper";
import "./TextArea.css"

function TextArea({ style, children, name, ...rest }) {
    const handleOnDragDrop = (e) => {
        e.dataTransfer.effectAllowed = "none"
        e.preventDefault();
    }

    return (
        <Wrapper style={style}>
            <label htmlFor={name}></label>
            <textarea
                name={name}
                id={name}
                onDragStart={handleOnDragDrop} onDrop={handleOnDragDrop}
                {...rest}>
            </textarea>
            {children}
        </Wrapper>
    )
}

export default TextArea;