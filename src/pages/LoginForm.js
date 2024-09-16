import React, { useState } from 'react';
import axios from 'axios';
import AuthService from "../Auth/AuthService";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log("---------------------------------------------------------------");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await AuthService.login(username, password).then(
                () => {
                    navigate("/home");
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                    window.location.reload();
                }
            );
        } catch (error) {
            // Handle login failure
            console.error("Login failed", error);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow custom-background' >
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;