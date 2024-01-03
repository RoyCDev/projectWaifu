import { useRef, useLayoutEffect } from "react";

import Wrapper from "./Wrapper";
import "./TextArea.css"

function TextArea({ className, children, ...rest }) {
    const textArea = useRef()

    const handleOnDragDrop = (e) => {
        e.dataTransfer.effectAllowed = "none"
        e.preventDefault();
    }

    const adjustHeight = () => {
        if (!rest.rows) {
            textArea.current.style.height = '0px';
            textArea.current.style.height = `${textArea.current.scrollHeight}px`
            textArea.current.style.overflowY = "hidden"
            // setTimeout(() => textArea.current.style.height = `${textArea.current.scrollHeight + 1}px`, 50)
        }
    }

    useLayoutEffect(adjustHeight, []);

    return (
        <Wrapper className={className}>
            <textarea
                ref={textArea}
                onDragStart={handleOnDragDrop} onDrop={handleOnDragDrop}
                {...rest}>
            </textarea>
            {children}
        </Wrapper>
    )
}

export default TextArea;