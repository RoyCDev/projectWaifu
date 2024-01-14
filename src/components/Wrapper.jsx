import classNames from "classnames";
import "./Wrapper.css"

function Wrapper({ className, children, ...rest }) {
    const classes = classNames("outline", className)
    return (
        <div className={classes} {...rest}>{children}</div>
    )
}

export default Wrapper;