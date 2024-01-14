import { useState, useRef, useEffect } from "react";
import { apiRequest } from "../util";

import ErrorMsg from "./ErrorMsg"
import Input from "./Input";
import "./AuthForm.css"

function AuthForm({ setVis, setIsLoggedIn }) {
    const [inputs, setInputs] = useState();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [errorMsg, setErrorMsg] = useState()

    const auth = useRef();

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate();
    }

    const authenticate = async () => {
        try {
            const endPoint = isRegisterMode ? "register" : "login";
            await apiRequest("POST", `/security/${endPoint}`, inputs);

            setVis(false);
            setIsLoggedIn(true);
        }

        catch (error) {
            setErrorMsg(error.response.data);
        }
    }

    const toggleMode = () => {
        setInputs()
        setIsRegisterMode(prev => !prev);

        if (!isRegisterMode) {
            setErrorMsg("Password must have at least 6 characters");
        }
        else {
            setErrorMsg();
        }
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!auth.current.contains(e.target) && e.target.alt !== "profile img") {
                setVis(false);
            }
        }
        document.addEventListener("click", handleClickOutside, true);

        return () => document.removeEventListener("click", handleClickOutside, true);
    }, [])


    return (
        <div className="dark outline auth" ref={auth}>
            {!!errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
            <form className="auth-form" onSubmit={handleSubmit}>
                {isRegisterMode &&
                    <Input leftBorder type="text" name="username" label="Username"
                        onChange={handleChange}
                        value={inputs?.username || ""} />
                }

                <Input leftBorder type="email" name="email" label="Email"
                    onChange={handleChange}
                    value={inputs?.email || ""} />

                <Input leftBorder type="password" name="password" label="Password"
                    onChange={handleChange}
                    value={inputs?.password || ""} />

                <ul>
                    <li onClick={toggleMode}>
                        {isRegisterMode ? "Go Back to Login" : "Create an Account"}
                    </li>
                    <li>
                        {/* <button>a</button> */}
                    </li>
                    <li>
                        <button>{isRegisterMode ? "Sign Up" : "Login"}</button>
                    </li>
                </ul>

            </form>
        </div >

    )
}

export default AuthForm;