import React, { useState } from "react";
import axios from "axios";
import { CONSTANTS } from "../utils/constants";

const Login = ({ setToken, setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${CONSTANTS.apiUrl}/user/login`,
                {
                    email,
                    password,
                }
            );
            setToken(response.data.token);
            setUser(response.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            setMessage("Login successful!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Login;
