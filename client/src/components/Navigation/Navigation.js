import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import { useSelector } from 'react-redux';

const toggleMenu = () => {
    document.querySelector(".fa-bars").classList.toggle("hidden");
    document.querySelector(".fa-times").classList.toggle("hidden");
    document.querySelector("aside").classList.toggle("show");
}

const Navigation = () => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <nav>
            <div className="menu-container">
                <div className="menu-burger">
                    <i className="fa fa-bars" aria-hidden="true" onClick={toggleMenu}></i>
                    <i className="fa fa-times hidden" aria-hidden="true" onClick={toggleMenu}></i>    
                </div>
                <NavLink to="/"><div className="menu-logo">ShopIt</div></NavLink>
                <div className="menu-search">
                    <input type="text" className="menu-input"/>
                </div>
                <div className="menu-account">
                    {
                        userInfo ? <NavLink to="/profile" className="button empty">Your Profile</NavLink>
                        :
                        <NavLink to="/signin" className="button empty">Sign In</NavLink>
                    }
                    <NavLink to="#" className="button">Your Cart</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navigation; 