import { useState } from "react"

import avatar from "../assets/avatar/Guest.png"
import ErrorMsg from "./ErrorMsg"
import AuthForm from "./AuthForm"
import AboutMe from "./AboutMe"
import "./userProfile.css"

function UserProfile({ user, isLoggedIn }) {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(prev => !prev)
    }

    return (
        <>
            <section className="profile">
                {showForm && (
                    isLoggedIn ?
                        <AboutMe setVis={setShowForm} user={user} /> :
                        <AuthForm setVis={setShowForm} />
                )}
                <img onClick={handleClick} src={avatar} alt="profile img" />
            </section>
        </>
    )
}

export default UserProfile;