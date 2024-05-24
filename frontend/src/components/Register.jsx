import React, { useState } from "react";
import axios from "axios";
import { CONSTANTS } from "../utils/constants";

const Register = ({ setToken, setUser }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();

        const fileInput = document.querySelector('input[name="proPic"]');

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("proPic", fileInput.files[0]);

        try {
            const response = await axios.post(
                `${CONSTANTS.apiUrl}/user`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setToken(response.data.token);
            setUser(response.data.name);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("name", response.data.name);
            setMessage("Registration successful!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label>Profile Pic:</label>
                    <input type="file" name="proPic" required />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default Register;
