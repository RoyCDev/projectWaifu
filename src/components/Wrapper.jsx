import classNames from "classnames";
import "./Wrapper.css"

function Wrapper({ className, children, style, ...rest }) {
    const classes = classNames("outline", className, style)

    return (
        <div className={classes} {...rest}>{children}</div>
    )
}

export default Wrapper;