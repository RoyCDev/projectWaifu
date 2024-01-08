import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import TextArea from "./TextArea"
import ErrorMsg from "./ErrorMsg";

import { MdEdit, MdSave } from "react-icons/md";
import { BsFillPeopleFill, BsFillChatFill } from "react-icons/bs";
import { apiRequest } from "../util";
import "./UserProfileDetails.css"

function UserProfileDetails({ setVis, user, setUser, setIsLoggedIn }) {
    const [isEditBioMode, setIsEditBioMode] = useState(false);
    const [isEditPwMode, setIsEditPwMode] = useState(false);

    const profile = useRef()
    const [bio, setBio] = useState({ username: user.username, desc: user.desc });
    const [pw, setPw] = useState()
    const [errorMsg, setErrorMsg] = useState()

    const handleBioChange = (e) => {
        setBio({ ...bio, [e.target.name]: e.target.value });
    }

    const handlePwChange = (e) => {
        setPw({ ...pw, [e.target.name]: e.target.value })
    }

    const setToEditBioMode = () => {
        setIsEditBioMode(true);
        setIsEditPwMode(false);
    }

    const setToEditPwMode = () => {
        setIsEditPwMode(true)
        setIsEditBioMode(false);
    }

    const cancelEdit = () => {
        setIsEditBioMode(false);
        setBio({ username: user.username, desc: user.desc });
        setIsEditPwMode(false);
        setPw();
    }

    const handleBioSubmit = async (e) => {
        e.preventDefault();

        if (bio.desc !== user.desc) {
            const res = await apiRequest("POST", "/api/user/change/description", bio.desc);
            // const res = { message: "success" }
            setErrorMsg(res.message)
            setUser({ ...user, desc: bio.desc })
        }

        if (bio.username !== user.username) {
            const res = await apiRequest("POST", "/api/user/change/username", bio.username);
            // const res = { message: "success" }
            if (res.message.indexOf("success") !== -1) {
                setUser({ ...user, username: bio.username })
                setIsEditBioMode(false);
                setIsEditPwMode(false);
            }
            setErrorMsg(res.message)
        }

        else {
            setIsEditBioMode(false);
            setIsEditPwMode(false);
        }
    }

    const handlePwSubmit = async (e) => {
        e.preventDefault();

        const res = await apiRequest("POST", "/api/user/change/password", pw);
        if (res.message.indexOf("success") !== -1) {
            cancelEdit()
        }
        setErrorMsg(res.message)
    }

    const handleLogout = async () => {
        await apiRequest("POST", "/security/logout", {});
        setVis(false);
        setIsLoggedIn(false);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!profile.current.contains(e.target) && e.target.alt !== "profile img") {
                setVis(false);
            }
        }
        document.addEventListener("click", handleClickOutside, true);

        return () => document.removeEventListener("click", handleClickOutside, true);
    }, [])

    return (
        <div className="dark outline profile-details" ref={profile}>
            {!!errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <form className="bio-form" onSubmit={handleBioSubmit}>
                <p className="bio-header">About Me
                    {isEditBioMode ?
                        <button><MdSave /></button> :
                        <MdEdit onClick={setToEditBioMode} />
                    }
                </p>

                <Input leftBorder type="text" name="username" className="username"
                    placeholder="Username"
                    value={bio.username}
                    readOnly={!isEditBioMode}
                    onChange={handleBioChange}
                />

                <label htmlFor="desc"></label>
                <TextArea className="dark" name="desc" rows={4} readOnly={!isEditBioMode}
                    value={bio.desc}
                    onChange={handleBioChange} />
            </form>

            <section className="stats">
                <BsFillPeopleFill />
                <span> <span className="number">0</span> Friends </span>
                <span className="rank">Creator</span>

                <BsFillChatFill />
                <span> <span className="number">0</span> Messages sent </span>
                <span>Join 1/2/2024</span>
            </section>

            {
                isEditPwMode &&
                <form className="pw-form" onSubmit={handlePwSubmit}>
                    <p className="pw-header">Change Password
                        <button><MdSave /></button>
                    </p>

                    <Input type="password" name="current" placeholder="Current"
                        value={pw?.current || ""}
                        onChange={handlePwChange} />
                    <Input type="password" name="new" placeholder="New"
                        value={pw?.new || ""}
                        onChange={handlePwChange} />
                </form>
            }

            <ul>
                {(!isEditBioMode && !isEditPwMode) ?
                    <li onClick={setToEditPwMode}> Change Password </li> :
                    <li onClick={cancelEdit}> Cancel edits </li>
                }
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </div >
    )
}

export default UserProfileDetails;