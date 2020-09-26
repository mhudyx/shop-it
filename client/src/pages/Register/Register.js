import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../actions/user.action';
import './Register.css';
import { PromiseProvider } from 'mongoose';

const RegisterPage = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;

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
        dispatch(register(name, email, password));
    }

    return (
        <div className="register">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2>Create Account</h2>
                        </li>
                        <li>
                            {loading && <div>Loading...</div>}
                            {error && <div>{error}</div>}
                        </li>
                        <li>
                            <label htmlFor="email">Name</label>
                            <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)} />
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
                            <label htmlFor="rePassword">Re-Enter Password</label>
                            <input type="password" id="rePassword" name="rePassword" onChange={(e) => setRePassword(e.target.value)} />
                        </li>
                        <li>
                            <button type="submit" className="button wide">Register</button>
                        </li>
                        <li className="aqua">
                            Already have an account?
                        </li>
                        <li>
                            <NavLink to="/signin" className="button wide empty">Sign In</NavLink>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage; 