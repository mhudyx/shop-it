import React from 'react';
import { NavLink } from 'react-router-dom';
import './Aside.css';

const Aside = () => {
    return (
        <aside>
            <div className="aside-container">
                <div className="aside-account">
                    <NavLink to="#" className="button mobile empty">Sign In</NavLink>
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