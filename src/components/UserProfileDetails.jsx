import { useState } from "react";
import Wrapper from "./Wrapper";
import Input from "./Input";
import TextArea from "./TextArea"

import { MdEdit, MdSave } from "react-icons/md";
import { BsFillPeopleFill, BsFillChatFill } from "react-icons/bs";

import axios from "axios";
import classNames from "classnames";
import "./UserProfileDetails.css"

function UserProfileDetails() {
    const [isEditBioMode, setIsEditBioMode] = useState(false);
    const [isEditPwMode, setIsEditPwMode] = useState(false);

    const errorMsgClasses = classNames("errorMsg", {
        "default": isEditPwMode
    })

    const [inputs, setInputs] = useState({
        username: "Yahallo",
        desc: "Mathi, grinds for unique scores for ages finally achieves his first 1k with a pretty epic map, mrekk permazoomer bad mannered elementary schooler kid"
    });

    const handleBioChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const [errorMsg, setErrorMsg] = useState("");

    const setToEditBioMode = () => {
        setIsEditBioMode(true);
        setIsEditPwMode(false);
    }

    const setToEditPwMode = () => {
        setIsEditPwMode(true)
        setIsEditBioMode(false);
    }

    const cancelEditMode = () => {
        setIsEditBioMode(false);
        setIsEditPwMode(false);
    }

    // const handleBioSubmit = () => {
    //     const res = axios.post();
    //     setErrorMsg(res.data);
    //     if success -> cancelEditMode
    // }

    // const handlePwSubmit = () => {
    //     const res = axios.post();
    //     setErrorMsg(res.data);
    //     if success -> cancelEditMode
    // }

    return (
        <Wrapper className="dark profile-details">
            <form className="bio-form">
                <p className="bio-header">About Me
                    {isEditBioMode ?
                        <button><MdSave /></button> :
                        <MdEdit onClick={setToEditBioMode} />
                    }
                </p>

                <div className="username">
                    <span className="border-left">
                        <label htmlFor="username"></label>
                    </span>
                    <Input type="text" name="username" id="username" readOnly={!isEditBioMode}
                        placeholder="Username"
                        value={inputs.username}
                        onChange={handleBioChange}
                    />
                </div>

                <label htmlFor="desc"></label>
                <TextArea className="dark" name="desc" rows={4} readOnly={!isEditBioMode}
                    value={inputs.desc}
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
                <form className="pw-form">
                    <p className="pw-header">Change Password
                        <button><MdSave /></button>
                    </p>
                    <label htmlFor="currentPw"></label>
                    <Input type="password" name="currentPw" id="currentPw"
                        placeholder="Current"></Input>
                    <label htmlFor="newPw"></label>
                    <Input type="password" name="newPw" id="newPw"
                        placeholder="New"></Input>
                </form>
            }

            <p className={errorMsgClasses}>{errorMsg}</p>

            <ul>
                {(!isEditBioMode && !isEditPwMode) ?
                    <li onClick={setToEditPwMode}> Change Password </li> :
                    <li onClick={cancelEditMode}> Cancel edits </li>
                }
                <li><button>Logout</button></li>
            </ul>
        </Wrapper >
    )
}

export default UserProfileDetails;