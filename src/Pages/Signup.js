import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Signup = () => {
    useEffect(() => {
        const signupForm = document.getElementById("signup-form");
        const success = document.getElementById("success");
        const failed = document.getElementById("failed");
        const loading = document.getElementById("loading");
        const loginLink = document.getElementById("login-link");

		const signup = (e) => {
			e.preventDefault();
			const formData = new FormData(signupForm);
			const username = formData.get("username");
            const password = formData.get("password");
            const email = formData.get("email");
            const fullName = formData.get("fullname");
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
                    email: email,
                    fullName: fullName
				}),
				method: "POST",
			};

			async function submitUser() {
				const res = await fetch(
					"https://budgetify20.herokuapp.com/api/user",
					Params
				);
                const data = await res.json();
                signupForm.reset();
                console.log(data);
                success.style.display = "flex";
                loading.style.display = "none";
                failed.style.display = "none";
                success.innerHTML = data.error ? data.error + " Please try again" : data.success;
                loginLink.style.display = "block";
			}
			submitUser().catch(err => {
                failed.style.display = "flex";
                loading.style.display = "none";
                failed.innerHTML = err;
            });
		};
        signupForm.onsubmit = signup;

    })



    return (
        <div>
            <Navbar />
        <section id="signup">
    <img src="register-user.png" alt="" className="user-icon-signup"/>
    <h3>Register</h3>
    <form id="signup-form">
        <div className="user-details-signup">
            <div className="input-field-signup">
                <label htmlFor="username" className="user-1">USERNAME</label>
                <input type="text" name="username" id="username-signup" placeholder="Enter Username"required />
            </div>
            <div className="input-field-signup">
                <label>FULLNAME</label>
                <input type="text" name="fullname" id="fullname-signup" placeholder="Enter Fullname" required />
            </div>
        </div>
        <div className="user-details-signup">
            <div className="input-field-signup">
                <label htmlFor="e-mail" className="user-1-signup">E-MAIL</label>
                <input type="email" name="email" id="email-signup" placeholder="Enter E-mail" required />
            </div>
            <div className="input-field-signup">
                <label htmlFor="">PASSWORD</label>
            <input type="password" name="password" id="password-signup" placeholder="Input Password" required />
            </div>
        </div>
            <input type="submit" value="Sign Up" id="Sign-up" />
        <div className="Successful-login" id="success">Registeration Successful!</div>
        <div className="Unsuccessful-login" id="failed">Use a valid user input</div>
        <div id="loading"><h4>Loading...</h4></div>
        <p id="login-link"><Link to="/login">Click Here!</Link></p>
    </form>
</section>
<div className="illustration-signup"></div>
</div>
    )
}

export default Signup;