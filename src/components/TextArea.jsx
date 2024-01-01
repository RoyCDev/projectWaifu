import { useRef, useLayoutEffect } from "react";

import Wrapper from "./Wrapper";
import "./TextArea.css"

function TextArea({ className, children, ...rest }) {
    const textArea = useRef()

    const adjustHeight = () => {
        if (!rest.rows) {
            textArea.current.style.height = '0px';
            // textArea.current.style.height = `${textArea.current.scrollHeight + 1}px`
            setTimeout(() => textArea.current.style.height = `${textArea.current.scrollHeight + 1}px`, 50)
        }
    }

    useLayoutEffect(adjustHeight, []);

    return (
        <Wrapper className={className}>
            <textarea ref={textArea} {...rest}></textarea>
            {children}
        </Wrapper>
    )
}

export default TextArea;