import { useState, useRef, useEffect } from "react";
import axios from "axios";

import Wrapper from "./Wrapper";
import Input from "./Input";
import "./AuthForm.css"

function AuthForm({ setVis }) {
    const [inputs, setInputs] = useState({});
    const [errorMsg, setErrorMsg] = useState("Password must have at least 6 characters");
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const form = useRef();

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate();
    }

    const authenticate = async () => {
        const endPoint = isRegisterMode ? "register" : "login"
        const res = await axios.post(`http://52.9.162.97:8080/security/${endPoint}`, inputs, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    const toggleMode = () => {
        setIsRegisterMode(prev => !prev);
        setInputs({})
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!form.current.contains(e.target) && e.target.alt !== "profile img") {
                setVis(false);
            }
        }
        document.addEventListener("click", handleClickOutside, true);

        return () => document.removeEventListener("click", handleClickOutside, true);
    }, [])


    return (
        <form onSubmit={handleSubmit} ref={form}>
            <Wrapper className="dark">
                {isRegisterMode &&
                    <div>
                        <span><label htmlFor="username"> Username </label></span>
                        <Input type="text" name="username" id="username"
                            onChange={handleChange}
                            value={inputs.username || ""} />
                    </div>
                }

                <div>
                    <span><label htmlFor="email"> Email </label></span>
                    <Input type="email" name="email" id="email"
                        onChange={handleChange}
                        value={inputs.email || ""} />
                </div>

                <div>
                    <span><label htmlFor="password"> Password </label></span>
                    <Input type="password" name="password" id="password"
                        onChange={handleChange}
                        value={inputs.password || ""} />
                </div>
                <p>{errorMsg}</p>

                <nav>
                    <ul>
                        <li onClick={toggleMode}>
                            {isRegisterMode ? "Go Back to Login" : "Create an Account"}
                        </li>
                        <li>
                            <button>{isRegisterMode ? "Sign Up" : "Login"}</button>
                        </li>
                    </ul>
                </nav>
            </Wrapper>
        </form >

    )
}

export default AuthForm;