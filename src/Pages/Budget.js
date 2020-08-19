import React, { useEffect, useState } from 'react';
import Chart from "chart.js";
import { Link, Redirect } from "react-router-dom";

const Budget = (props) => {

    const [budgetData, setBudgetData] = useState(null);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
    const toggleBtn=document.querySelector(".toggle-btn");
    const toggleBar1=document.querySelector(".toggle-bar-1");
    const toggleBar2=document.querySelector(".toggle-bar-2");
    const toggleBar3=document.querySelector(".toggle-bar-3");
    const mainNav=document.querySelector(".main-nav");
    let click=0;
    toggleBtn.addEventListener('click',function(){
        if(click%2===0){
            mainNav.style.left="0";
            toggleBar1.style.opacity="0";
            toggleBar2.style.transform="rotateZ(45deg) translateX(6px)";
            toggleBar3.style.transform="rotateZ(-45deg) translateX(4px) translateY(2px)";
        }
        else{
            mainNav.style.left="-300px";
            toggleBar1.style.opacity="1";
            toggleBar2.style.transform="rotateZ(0) translateX(0)";
            toggleBar3.style.transform="rotateZ(0) translateX(0) translateY(0)";
        }
        click++
    })
    mainNav.addEventListener('click',function(e){
        for(let i=0;i<mainNav.children.length;i++){
            if(e.target.textContent===mainNav.children[i].textContent){
                        click++;
                        mainNav.style.left="-300px";
                        toggleBar1.style.opacity="1";
                        toggleBar2.style.transform="rotateZ(0) translateX(0)";
                        toggleBar3.style.transform="rotateZ(0) translateX(0) translateY(0)";
                        break;
            }
        }
    });

    if (props.user === null) setRedirect("/login");

    async function getBudgetData(){
        const res = await fetch("https://budgetify20.herokuapp.com/api/budget", {method: "GET"});
        console.log(res);
        const data = await res.json();
        setBudgetData(data);
    };
    getBudgetData().catch(err => {
        console.log(err);
    })
    console.log(budgetData);

   var ctx = document.getElementById("barChart").getContext('2d');
    new Chart(ctx, {
    type: 'bar',
    data: {
      labels: "data",
      datasets: [{
        label: 'Population',
        data: [1, 2, 4, 5],
        backgroundColor: "rgba(255,0,0,1)",
        color: "#485281",
      }]
    }
    });

    }, [budgetData, props.user])
    if (redirect === null){
    return (
        <>
        <header>
            <div className="toggle-btn">
                <div className="toggle-bar-1 box"></div>
                <div className="toggle-bar-2 box"></div>
                <div className="toggle-bar-3 box"></div>
            </div>
            <div className="logo">Budg<span>etify</span></div>
        </header>
        <nav className="main-nav">
            <ul>
                <li><Link to="">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/">Log Out</Link></li>
                <li><Link to="#">About Us</Link></li>
                <li><Link to="#">Contact Us</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
            </ul>
        </nav>
        <div className="budget">
                <div className="title">
                    <h5><strong>Budget Profile</strong></h5>
                </div>
                <div className="dashboard">
                    <div className="profile">
                        <h5>Welcome, Femi Lawal</h5>
                        <div className="amounts">
                           <h6>Total Allocation</h6>
                            <p>#200,000</p>
                        </div>
                        <div className="amounts two">
                           <h6>Unallocated</h6>
                            <p>#34,000</p>
                        </div>
                        <div className="monthly">
                            <div className="monthly-title">
                                <p>Monthly</p>
                            </div>
                            <div className="expenses">
                                <div className="expense-item">
                                    <div className="title-edit">
                                        <p>Salaries</p>
                                        <i className="fa fa-edit"></i>
                                    </div>
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar"
                                            style={{width: "25%"}} aria-valuenow="25"
                                            aria-valuemin="0" aria-valuemax="100">
                                            25%</div>
                                    </div>
                                </div>
                                <div className="expense-values">
                                    <p>#669,940</p>
                                    <p>#65,040</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="visualizations">
                        <div id="bar-chart"><canvas id="barChart"></canvas></div>
                        <div className="add-expenditure">
                            <form id="expenditure">
                                <div className="add-budget">
                                    <input type="number" name="budget" required placeholder="Gross Budget"/>
                                    <input type="number" name="amount" required placeholder="Amount"/>
                                </div>
                                <div className="add-expense">
                                    <button type="submit" id="add-btn">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    } else return <Redirect to={redirect}/>
};

export default Budget;
