import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from '../../../context/Modal';

function LoginForm() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    if (sessionUser) return <Redirect to="/" />;

    function LoginDemoUser() {
        const demoUser = {
            email: 'demo@aa.io',
            password: 'password'
        }

        return dispatch(login(demoUser.email, demoUser.password))
            .then(closeModal);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        }
    };



    return (
        <div className="form sign-in">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <ul className="error-list">
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <label>
                    Email
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <div className='login-button'>
                    <button type="submit">Log In</button>
                </div>

                <div className="demo-login">
                    <button type='submit' onClick={LoginDemoUser}>Demo User</button>
                </div>

            </form>
        </div>

    );
}

export default LoginForm;
