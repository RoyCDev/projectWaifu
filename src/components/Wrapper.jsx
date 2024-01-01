import classNames from "classnames";
import "./Wrapper.css"

function Wrapper({ className, children }) {
    const classes = classNames("outline", className)
    return (
        <div className={classes}>{children}</div>
    )
}

export default Wrapper;