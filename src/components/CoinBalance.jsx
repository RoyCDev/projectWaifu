import Wrapper from "./Wrapper"
import coin from "../assets/coin.png"

import classNames from "classnames"
import "./CoinBalance.css"

function CoinBalance({ amount, className, ...rest }) {
    const classes = classNames("coin", className)

    return (
        <Wrapper className={classes} {...rest}>
            <img src={coin} alt="" /> {amount}
        </Wrapper>
    )
}

export default CoinBalance