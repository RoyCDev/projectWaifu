import Wrapper from "./Wrapper";

import { MdWarning } from "react-icons/md";
import "./ErrorMsg.css"

function ErrorMsg({ children }) {
    return (
        <Wrapper className="errorMsg dark">
            <MdWarning />
            {children}
        </Wrapper>
    )
}

export default ErrorMsg;