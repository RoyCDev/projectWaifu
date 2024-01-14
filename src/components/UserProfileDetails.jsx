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
    const [bio, setBio] = useState({ username: user.username, description: user.description });
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
        setBio({ username: user.username, description: user.description });
        setErrorMsg();
    }

    const setToEditPwMode = () => {
        setIsEditPwMode(true)
        setIsEditBioMode(false);
        setPw();
        setErrorMsg();
    }

    const exitEdit = () => {
        setIsEditBioMode(false);
        setIsEditPwMode(false);
    }

    const handleBioSubmit = async (e) => {
        e.preventDefault();

        if (bio.description !== user.description) {
            const res = await apiRequest("POST", "/api/user/change/description", bio.description);
            setErrorMsg(res.message)
            setUser({ ...user, description: bio.description })
        }

        if (bio.username !== user.username) {
            try {
                const res = await apiRequest("POST", "/api/user/change/username", bio.username);
                setUser({ ...user, username: bio.username })
                exitEdit();
                setErrorMsg(res.message);
            }
            catch (error) {
                setErrorMsg(error.response.data);
            }
        }

        else {
            exitEdit();
        }
    }

    const handlePwSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await apiRequest("POST", "/api/user/change/password", pw);
            exitEdit()
            setErrorMsg(res.message)
        }
        catch (error) {
            setErrorMsg(error.response.data)
        }
    }

    const handleLogout = async () => {
        try {
            await apiRequest("POST", "/security/logout", {});
            setVis(false);
            setIsLoggedIn(false);
        }

        catch (error) {
            setErrorMsg(error.response.data)
        }
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

                <label htmlFor="description"></label>
                <TextArea className="dark" name="description" rows={4} readOnly={!isEditBioMode}
                    value={bio.description}
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

                    <Input type="password" name="oldpassword" placeholder="Current"
                        value={pw?.oldpassword || ""}
                        onChange={handlePwChange} />
                    <Input type="password" name="newpassword" placeholder="New"
                        value={pw?.newpassword || ""}
                        onChange={handlePwChange} />
                </form>
            }

            <ul>
                {(!isEditBioMode && !isEditPwMode) ?
                    <li onClick={setToEditPwMode}> Change Password </li> :
                    <li onClick={exitEdit}> Cancel edits </li>
                }
                <li><button onClick={handleLogout}>Logout</button></li>
            </ul>
        </div >
    )
}

export default UserProfileDetails;