import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const toggleMenu = () => {
    document.querySelector(".fa-bars").classList.toggle("hidden");
    document.querySelector(".fa-times").classList.toggle("hidden");
    document.querySelector("aside").classList.toggle("show");
}

const Navigation = () => {
    return (
        <nav>
            <div className="menu-container">
                <div className="menu-burger">
                    <i className="fa fa-bars" aria-hidden="true" onClick={toggleMenu}></i>
                    <i className="fa fa-times hidden" aria-hidden="true" onClick={toggleMenu}></i>    
                </div>
                <div className="menu-logo">ShopIt</div>
            </div>
        </nav>
    )
}

export default Navigation; 