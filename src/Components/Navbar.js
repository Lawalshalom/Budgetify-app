import React, { useEffect } from 'react';
import { Link } from "react-router-dom";


export default function Navbar() {
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
    })

    })

        return (
            <div>
               <header>
        <div className="toggle-btn">
            <div className="toggle-bar-1 box"></div>
            <div className="toggle-bar-2 box"></div>
            <div className="toggle-bar-3 box"></div>
        </div>
        <div className="logo"><h2>Budg<span>etify</span></h2></div>
    </header>
    <nav className="main-nav">
        <ul>
    <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Sign In</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
    </ul>
    </nav>
            </div>
        )
};
