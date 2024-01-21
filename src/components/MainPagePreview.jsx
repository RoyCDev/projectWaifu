import ai1 from "../assets/avatar/AI.png"
import user1 from "../assets/avatar/User.png"
import bg1 from "../assets/background/sand-castle-seagulls-anime-seascape-clouds-beach-summer.jpg"

import ChatBox from "./ChatBox"
import CoinBalance from "./CoinBalance"
import "./MainPagePreview.css"

function MainPagePreview({ type, setSelectedItem, selectedItem, user }) {
    const preview = {
        "ai-avatar": ai1,
        "user-profile": user1,
        "background": bg1,
    }
    preview[type] = selectedItem.img;

    const handleClick = () => {
        setSelectedItem();
    }

    return (
        <section className="preview">
            Preview
            <section
                className="chat"
                style={{ backgroundImage: `url(${preview.background})`, backgroundSize: "cover" }}>

                <ChatBox style="light-outline"
                    className="user1" username="Gemini" avatar={preview["ai-avatar"]} />

                <ChatBox style="light-outline"
                    className="user2" username={user.username} avatar={preview["user-profile"]} />
            </section>

            <p className="buy-tag" onClick={handleClick}> Buy </p>
            <CoinBalance className="buy" amount={selectedItem.cost}
                onClick={handleClick} />
        </section>
    )
}

export default MainPagePreview;