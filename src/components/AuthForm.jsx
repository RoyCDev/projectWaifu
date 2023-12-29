import { useState } from "react";
import axios from "axios";

import Outline from "./Outline";
import "./AuthForm.css"

function AuthForm() {
    const [inputs, setInputs] = useState({});
    const [errorMsg, setErrorMsg] = useState("incorrect, password must have at least 6 characters");
    const [isRegisterMode, setIsRegisterMode] = useState(false);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticate();
    }

    const authenticate = async () => {
        console.log(JSON.stringify(inputs))

        const res = await axios.post(`http://52.9.162.97:8080/login`, inputs, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log(res)
    }

    const toggleMode = () => {
        setIsRegisterMode(prev => !prev);
        setInputs({})
    }

    return (
        <form onSubmit={handleSubmit}>
            <Outline className="dark">
                {isRegisterMode &&
                    <div>
                        <label htmlFor="username"> Username </label>
                        <input type="text" name="username" id="username" autoComplete="off" required
                            onChange={handleChange}
                            value={inputs.username || ""} />
                    </div>
                }

                <div>
                    <label htmlFor="email"> Email </label>
                    <input type="email" name="email" id="email" autoComplete="off" required
                        onChange={handleChange}
                        value={inputs.email || ""} />
                </div>

                <div>
                    <label htmlFor="password"> Password </label>
                    <input type="password" name="password" id="password" autoComplete="off" required
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
            </Outline>
        </form >

    )
}

export default AuthForm;