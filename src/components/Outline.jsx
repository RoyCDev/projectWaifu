import classNames from "classnames";
import "./Outline.css"

function Outline({ className, children }) {
    const classes = classNames("outline", className)
    return (
        <div className={classes}>{children}</div>
    )
}

export default Outline;