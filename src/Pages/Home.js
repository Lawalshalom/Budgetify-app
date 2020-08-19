import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from "../Components/Navbar";

const Home = () => {

return (
    <div>
        <Navbar />
        <section id="home">
            <div className="introduction" data-aos="fade-right">
                <h4><strong>Manage and Control Your Expenditure</strong></h4>
                <p>From budgets to bills and  many more,
                     you’ll discover the effortless way
                     to stay on top of it all.
                </p>
                <div className="register">
                    <div className="Sign-up"><Link to="/signup">Sign Up</Link></div>
                    <div className="Login"><Link to="/login">Login</Link></div>
                </div>
            </div>
            <div className="illustration" data-aos="fade-left">
                <img src="project-img.jpg" alt=""/>
            </div>
        </section>
    </div>
    )
}

export default Home;