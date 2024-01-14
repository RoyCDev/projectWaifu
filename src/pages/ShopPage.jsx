import { useState } from "react";

import Wrapper from "../components/Wrapper"
import ShopList from "../components/ShopList";
import CoinBalance from "../components/CoinBalance";
import MainPagePreview from "../components/MainPagePreview";
import { IoChevronBackOutline, IoPerson } from "react-icons/io5";
import { FaRobot, FaImage } from "react-icons/fa6";
import "./ShopPage.css"

function ShopPage({ user }) {
    const [productType, setProductType] = useState("ai-avatar");
    const [selectedItem, setSelectedItem] = useState();

    const navItems = [
        { type: "ai-avatar", displayText: "AI Avatar", icon: <FaRobot /> },
        { type: "user-profile", displayText: "User Profile", icon: < IoPerson /> },
        { type: "background", displayText: "Background", icon: <FaImage /> }
    ]

    const renderedNavItems = navItems.map(item => {
        return (
            <li className={productType === item.type ? "selected" : null}
                onClick={() => handleNavClick(item.type)}>
                {item.icon}
            </li>
        )
    })

    const handleNavClick = (type) => {
        if (productType !== type) {
            setProductType(type);
            setSelectedItem();
        }
    }

    return (
        <main className="shop">
            <Wrapper className="shop-gradiant dark">
                <div className="shop-header">
                    <IoChevronBackOutline /> Main
                </div>
                <nav className="shop-nav">
                    <ul>
                        <li className="product-type">
                            {navItems.find(item => item.type === productType).displayText}
                        </li>
                        <li className="mode">Shop</li>
                        {renderedNavItems}
                    </ul>
                </nav>
                <ShopList type={productType} setSelectedItem={setSelectedItem} />
            </Wrapper>

            <CoinBalance className="user-balance" amount={375} />
            {!!selectedItem &&
                <MainPagePreview type={productType}
                    setSelectedItem={setSelectedItem} selectedItem={selectedItem} user={user} />
            }
        </main>
    )
}

export default ShopPage;