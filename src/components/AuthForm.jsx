import { useState, useRef, useEffect } from "react";

import { apiRequest } from "../util";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";

import ErrorMsg from "./ErrorMsg"
import Input from "./Input";
import "./AuthForm.css"

function AuthForm({ setVis }) {
    const [inputs, setInputs] = useState();
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [errorMsg, setErrorMsg] = useState()

    const authRef = useRef();

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate([isRegisterMode, inputs]);
    }

    const { mutate: authenticate, isPending } = useMutation({
        mutationFn: async ([isRegisterMode, inputs]) => {
            const endPoint = isRegisterMode ? "register" : "login";
            return await apiRequest.post(`/security/${endPoint}`, inputs);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(["user", "chat history"]);
            setVis(false);
        },
        onError: (error) => setErrorMsg(error.response.data.message)
    })

    const toggleMode = () => {
        setInputs()
        setIsRegisterMode(prev => !prev);
        setErrorMsg(isRegisterMode ? undefined : "Password must have at least 6 characters");
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!authRef.current.contains(e.target) && e.target.alt !== "profile img") {
                setVis(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside, true);

        return () => document.removeEventListener("mousedown", handleClickOutside, true);
    }, [])


    return (
        <div className="dark outline auth" ref={authRef}>
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
                        <button>{isRegisterMode ? "Sign Up" : "Login"}</button>
                    </li>
                </ul>

            </form>
        </div >

    )
}

export default AuthForm;