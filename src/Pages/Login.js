import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function Login(props) {
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        const success = document.getElementById("success");
        const failed = document.getElementById("failed");
        const loading = document.getElementById("loading");
        const loginForm = document.getElementById("login-form");

		const login = (e) => {
			e.preventDefault();
			const formData = new FormData(loginForm);
			const username = formData.get("username");
            const password = formData.get("password");
            loading.style.display = "flex";
            success.style.display = "none";
            failed.style.display = "none";

			const Params = {
				headers: {
					"Content-type": "application/JSON",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
				method: "POST",
			};

			async function auth() {
				const res = await fetch(
					"https://budgetify20.herokuapp.com/api/login",
					Params
				);
				const data = await res.json();
                console.log(data);
                loginForm.reset();
                success.style.display = "flex";
                loading.style.display = "none";
                failed.style.display = "none";
                success.innerHTML = data.error ? data.error + " Please try again" : data.message;
                if(data.message) {
                    props.updateUser({
                        username: username,
                        password: password
                    })
                    setRedirect("/profile");
                }
			}
			auth().catch(err => {
                failed.style.display = "flex";
                loading.style.display = "none";
                failed.innerHTML = err;
            });
		};
        if (loginForm) loginForm.onsubmit = login;

    })

    if (redirect === null) {
    return (
        <div>
            <Navbar />
            <section id="login">
    <img src="user-icon.png" alt="" className="user-icon-login" />
    <h3>Sign In</h3>
    <form id="login-form">
        <div className="input-field-login">
            <i className="fa fa-user"></i>
            <input type="text" name="username" id="username-login" placeholder="USERNAME" required />
        </div><br/>
        <div className="input-field-login">
            <i className="fa fa-lock"></i>
        <input type="password" name="password" id="password-login" placeholder="PASSWORD" required />
        </div><br/>
        <input type="submit" value="Login" id="login-btn" /><br/>
        <div className="Successful-login" id="success">Registeration Successful!</div>
        <div className="Unsuccessful-login" id="failed">Use a valid user input</div>
        <div id="loading"><h4>Loading...</h4></div>
        <span className="remember"><input type="checkbox" name="remember-me" id="remember-me"/><label>Remember me</label></span>
        <label htmlFor="Forgot-password" className="forgot-password"><Link to="/forgot">Forgot Password?</Link></label>
    </form>
    <div className="line-through"></div>
    <p>Don't have an account ? <Link to="/signup">REGISTER HERE</Link></p>
</section>
<div className="illustration-login"></div>
    </div>
    )
} else {
    return <Redirect to={redirect}/>
};
};
