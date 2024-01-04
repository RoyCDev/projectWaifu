import { useState } from "react"

import avatar from "../assets/avatar/Guest.png"
import NameTag from "./NameTag"
import AuthForm from "./AuthForm"
import UserProfileDetails from "./UserProfileDetails"
import "./userProfile.css"

function UserProfile() {
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleClick = () => {
        setIsFormVisible(prev => !prev)
    }

    return (
        <>
            <section className="profile">
                {isFormVisible && <AuthForm setVis={setIsFormVisible} />}
                <UserProfileDetails />
                <img onClick={handleClick} src={avatar} alt="profile img" />
                {/* <NameTag onClick={handleClick}>Guest</NameTag> */}
            </section>
        </>
    )
}

export default UserProfile;