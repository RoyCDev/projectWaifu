import { useState } from "react";
import axios from "axios";

function AuthenticationForm() {
    const [inputs, setInputs] = useState({});

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
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(res);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="username" id="username" autoComplete="off"
                onChange={handleChange}
                value={inputs.username || ""} />

            <input type="email" name="email" id="email" autoComplete="off"
                onChange={handleChange}
                value={inputs.email || ""} />

            <input type="password" name="password" id="password" autoComplete="off"
                onChange={handleChange}
                value={inputs.password || ""} />
            <button>Submit</button>
        </form>
    )
}

export default AuthenticationForm;