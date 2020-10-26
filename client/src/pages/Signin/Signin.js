import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../../actions/user.action';
import './Signin.css';

const SigninPage = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();
    useEffect(() => {
        if(userInfo){
           props.history.push("/");
        }

        return () => {
            //
        }
    }, [userInfo]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return (
        <div className="signin">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Sign In</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                        </li>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="button wide">Sign In</button>
                        </li>
                        <li className="aqua">
                            New to ShopIt?
                        </li>
                        <li>
                            <NavLink to="/register" className="button wide empty">Create your account!</NavLink>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default SigninPage; 