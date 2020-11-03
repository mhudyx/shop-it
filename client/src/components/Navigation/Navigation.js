import React, { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Navigation.css';
import { signout } from '../../actions/user.action';

const toggleMenu = () => {
    document.querySelector(".fa-bars").classList.toggle("hidden");
    document.querySelector(".fa-times").classList.toggle("hidden");
    document.querySelector("aside").classList.toggle("show");
}

const Navigation = () => {

    const [open, setOpen] = useState(false);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    useEffect(() => {
        if(open) {
            document.addEventListener("click", handleClickOutside);
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [open]);

    const handleClickOutside = e => {
        console.log("Clickkk")
        setOpen(false);
    };    

    const signoutHandler = () => {
        dispatch(signout());
    }


    return (
        <nav>
            <div className="menu-container">
                <div className="menu-burger">
                    <i className="fa fa-bars" aria-hidden="true" onClick={toggleMenu}></i>
                    <i className="fa fa-times hidden" aria-hidden="true" onClick={toggleMenu}></i>    
                </div>
                <Link to="/"><div className="menu-logo">ShopIt</div></Link>
                <div className="menu-search">
                    <input type="text" className="menu-input"/>
                </div>
                <div className="menu-account">
                    <Link to="/cart" className="button">
                        Your Cart
                        {cartItems.length > 0 && (
                            <span className="circle">{cartItems.length}</span>
                        )}
                    </Link>
                    { 
                        userInfo ? 
                        <>
                        <div className="list">
                            <button className="button empty list-manage" onClick={() => setOpen(!open)}>Manage <i className="fa fa-caret-down"></i>
                            </button>
                            <ul className={open ? "list-content" : "hide"}>
                                <li className="list-item">
                                    <Link to="/profile" >Edit Profile</Link>
                                </li>
                                <li className="list-item">
                                    <Link to="/"  onClick={signoutHandler}>Sign Out</Link>
                                </li>
                            </ul>
                        </div>
                        
                        {/* <Link to="/manage-product" className="button empty">Manage</Link> */}
                        
                        </>
                        :
                        <Link to="/signin" className="button empty">Sign In</Link>
                    }
                    
                    
                </div>
            </div>
        </nav>
    )
}

export default Navigation; 