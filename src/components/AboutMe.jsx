import { useState, useEffect, useRef } from "react";
import Input from "./Input";
import TextArea from "./TextArea"
import ErrorMsg from "./ErrorMsg";

import { apiRequest } from "../util";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

import { MdEdit, MdSave } from "react-icons/md";
import { BsFillPeopleFill, BsFillChatFill } from "react-icons/bs";
import "./AboutMe.css"

function AboutMe({ setVis, user }) {
    const [isEditBioMode, setIsEditBioMode] = useState(false);
    const [isEditPwMode, setIsEditPwMode] = useState(false);

    const profileRef = useRef()
    const [bio, setBio] = useState({ username: user.username, description: user.description });
    const [pw, setPw] = useState()
    const [errorMsg, setErrorMsg] = useState()

    const handleBioChange = (e) => setBio({ ...bio, [e.target.name]: e.target.value });
    const handlePwChange = (e) => setPw({ ...pw, [e.target.name]: e.target.value });

    const setToEditBioMode = () => {
        setIsEditBioMode(true);
        setErrorMsg();
    }

    const setToEditPwMode = () => {
        setIsEditPwMode(true)
        setErrorMsg();
    }

    const exitEdit = () => {
        setIsEditBioMode(false);
        setIsEditPwMode(false);
    }

    const cancelEdit = () => {
        exitEdit();
        setBio({ username: user.username, description: user.description });
        setPw();
    }

    const { mutate: changeBio, isPending: isPendingBio } = useMutation({
        mutationFn: async ([endPoint, input]) => await apiRequest.post(`/api/user/change/${endPoint}`, input),
        onSuccess: (res, variables) => {
            setErrorMsg(res.data.message)
            const updated = queryClient.setQueryData(["user"], prev => ({ ...prev, ...variables[1] }));

            // exitEdit if
            // 1. Only description is changed (otherwise, see 2)
            // 2. Username is changed successfully 
            if (bio.username === updated.username) exitEdit()
        },
        onError: (error) => setErrorMsg(error.response.data.message)
    })

    const handleBioSubmit = (e) => {
        e.preventDefault();

        if (bio.description !== user.description)
            changeBio(["description", { description: bio.description }])

        if (bio.username !== user.username)
            changeBio(["username", { username: bio.username }])

        // also exitEdit if neither is changed
        else exitEdit()
    }

    const { mutate: changePw, isPending: isPendingPw } = useMutation({
        mutationFn: async (pw) => await apiRequest.post("/api/user/change/password", pw),
        onSuccess: (res) => {
            setErrorMsg(res.data.message)
            exitEdit()
        },
        onError: (error) => setErrorMsg(error.response.data.message)
    })

    const handlePwSubmit = (e) => {
        e.preventDefault();
        changePw(pw);
    }

    const { mutate: logout, isPending: isPendingLogout } = useMutation({
        mutationFn: async () => await apiRequest.post("/security/logout"),
        onSuccess: () => {
            queryClient.setQueriesData(["user", "chat history"], null)
            setVis(false)
        },
        onError: (error) => setErrorMsg(error.response.data.message)
    })

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!profileRef.current.contains(e.target) && e.target.alt !== "profile img") {
                setVis(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside, true);

        return () => document.removeEventListener("mousedown", handleClickOutside, true);
    }, [])


    const conditionalFormSection = isEditPwMode ?
        <section className="pw">
            <p className="pw-header"> Change Password </p>

            <Input type="password" name="oldpassword" placeholder="Current"
                value={pw?.oldpassword || ""}
                onChange={handlePwChange} />
            <Input type="password" name="newpassword" placeholder="New"
                value={pw?.newpassword || ""}
                onChange={handlePwChange} />
        </section> :

        <TextArea style="dark" name="description" rows={4} readOnly={!isEditBioMode}
            value={bio.description}
            onChange={handleBioChange} />

    return (
        <div className="dark outline about-me" ref={profileRef}>
            {!!errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <form className="account-settings-form" onSubmit={isEditBioMode ? handleBioSubmit : handlePwSubmit}>
                <p className="bio-header">About Me
                    {(isEditBioMode || isEditPwMode) ?
                        <button><MdSave /></button> :
                        <MdEdit onClick={setToEditBioMode} />
                    }
                </p>

                <Input leftBorder type="text" name="username" className="username"
                    placeholder="Username"
                    value={bio.username}
                    readOnly={!isEditBioMode}
                    onChange={handleBioChange} />

                {conditionalFormSection}
            </form>

            <section className="stats">
                <BsFillPeopleFill />
                <span> <span className="number">0</span> Friends </span>
                <span className="rank"> {user.tag} </span>

                <BsFillChatFill />
                <span> <span className="number"> {user.total_messages} </span> Messages sent </span>
                <span>Join 1/2/2024</span>
            </section>

            <ul>
                {!(isEditBioMode || isEditPwMode) ?
                    <li onClick={setToEditPwMode}> Change Password </li> :
                    <li onClick={cancelEdit}> Cancel edits </li>
                }
                <li><button onClick={logout}>Logout</button></li>
            </ul>
        </div >
    )
}

export default AboutMe;