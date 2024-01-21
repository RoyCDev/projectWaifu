import ai1 from "../assets/avatar/AI.png"
import ai2 from "../assets/avatar/AI2.png"
import user1 from "../assets/avatar/User.png"
import user2 from "../assets/avatar/User2.png"
import bg1 from "../assets/background/sand-castle-seagulls-anime-seascape-clouds-beach-summer.jpg"
import bg2 from "../assets/background/yami-yami.jpg"

import Wrapper from "./Wrapper";
import CoinBalance from "./CoinBalance"
import "./ShopList.css"

function ShopList({ type, setSelectedItem }) {
    // const items = {
    //     "ai-avatar": [ai1, ai2, ai1, ai2, ai1, ai2, ai1, ai2, ai1, ai2],
    //     "user-profile": [user1, user2, user1, user2, user1, user2],
    //     "background": [bg1, bg2, bg1, bg2, bg1, bg2, bg1, bg2]
    // }

    const items = {
        "ai-avatar": [{ img: ai1, cost: 255 }, { img: ai2, cost: 150 }, { img: ai1, cost: 255 }, { img: ai2, cost: 150 }],
        "user-profile": [{ img: user1, cost: 255 }, { img: user2, cost: 150 }, { img: user1, cost: 255 }, { img: user2, cost: 150 }],
        "background": [{ img: bg1, cost: 255 }, { img: bg2, cost: 150 }, { img: bg1, cost: 255 }, { img: bg2, cost: 150 }, { img: bg1, cost: 255 }, { img: bg2, cost: 150 }]
    }

    const handleClick = (item) => {
        setSelectedItem(item)
    }

    const renderedList = items[type].map(item => {
        return (
            <Wrapper className={type} style="dark">
                <CoinBalance amount={item.cost} />
                <img className="product" src={item.img} alt="" onClick={() => { handleClick(item) }} />
            </Wrapper >
        )
    })

    return (
        <section className="shop-menu"> {renderedList} </section>
    )
}

export default ShopList;