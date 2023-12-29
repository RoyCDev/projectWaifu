import Outline from "./Outline";
import "./TextArea.css"

function TextArea({ showOption, ...rest }) {
    return (
        <Outline className="light">
            <textarea {...rest} rows="3"></textarea>
            {showOption &&
                <nav className="chatBoxNav">
                    <ul>
                        <li>Chat History</li>
                        <li>Shop</li>
                        <li>Preferences</li>
                    </ul>
                </nav>
            }
        </Outline>
    )
}

export default TextArea;