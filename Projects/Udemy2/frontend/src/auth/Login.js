import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
    const [data, setData] = useState({
        email: "",
        password: "",
        error: null,
    });

    const { email, password, error } = data;

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setData({ ...data, error: null });
            const res = await axios.post(
                "https://authbackend-1otv.onrender.com/api/auth/login",
                { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            localStorage.setItem("token", res.data.token);
            props.history.push("/");
        } catch (err) {
            setData({ ...data, error: err.response.data.error });
        }
    };
    const buttonStyle = {
        width: "100px",
        marginRight: "10px", // Adjust the margin as needed

    };
    return (
        <div className="row">
            <div className="col-sm-2" />
            <div className="col-sm-8">
                <h4 className="text-muted text-center mb-5">Log into your account</h4>
                <div className="card p-5 shadow">
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                            />
                        </div>
                        {error ? <p className="text-danger">{error}</p> : null}
                        <div className="text-center">
                            <button className="btn btn-primary" style={buttonStyle} onClick={handleSubmit}>
                                Login
                            </button>
                            <Link to="/register">
                                <button className="btn btn-primary" style={buttonStyle}>Register</button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <div className="col-sm-2" />
        </div>
    );
};

export default Login;