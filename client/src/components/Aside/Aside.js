import React from 'react';
import { NavLink } from 'react-router-dom';
import './Aside.css';
import { useSelector } from 'react-redux';

const Aside = () => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <aside>
            <div className="aside-container">
                <div className="aside-account">
                    { 
                        userInfo ? 
                        <>
                        <NavLink to="/profile" className="button mobile empty">Your Profile</NavLink>
                        <NavLink to="/manage-product" className="button mobile empty">Manage</NavLink>
                        </>
                        :
                        <NavLink to="/signin" className="button mobile empty">Sign In</NavLink>
                    }
                    <NavLink to="#" className="button mobile ">Your Cart</NavLink>
                </div>
                <div className="aside-categories">
                <h3>Shopping Categories</h3> 
                </div>
            </div>     
        </aside>
    )
}

export default Aside; 