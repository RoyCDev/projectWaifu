import { useState } from "react"

import avatar from "../assets/avatar/Guest.png"
import ErrorMsg from "./ErrorMsg"
import AuthForm from "./AuthForm"
import UserProfileDetails from "./UserProfileDetails"
import "./userProfile.css"

function UserProfile({ user, setUser, isLoggedIn, setIsLoggedIn }) {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(prev => !prev)
    }

    return (
        <>
            <section className="profile">
                {showForm && (
                    isLoggedIn ?
                        <UserProfileDetails setVis={setShowForm} user={user}
                            setUser={setUser} setIsLoggedIn={setIsLoggedIn} /> :
                        <AuthForm setVis={setShowForm} setIsLoggedIn={setIsLoggedIn} />
                )}
                <img onClick={handleClick} src={avatar} alt="profile img" />
            </section>
        </>
    )
}

export default UserProfile;