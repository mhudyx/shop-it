import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../../actions/user.action';
import { USER_UPDATE_PROFILE_RESET } from '../../constans/user.const';
import './Profile.css';

const Profile = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, user, error } = userDetails;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdateProfile;

    const dispatch = useDispatch();
    useEffect(() => {
        if(!user) {
            dispatch({ type: USER_UPDATE_PROFILE_RESET });
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Password and confirm password arent matched!');
          } else {
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
            props.history.push('/');
          }
    };

    return (
        <div className="form profile">
            <form onSubmit={submitHandler}>
                <div className="profile-header"><h2>User Profile</h2></div>
                {loading ? (
                    <>Loading...</>
                ) : (
                    <ul className="form-container">
                        <li>
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Enter name" value={name} />
                        </li>
                        <li>
                            <label htmlFor="email">Email</label>
                            <input type="text" id="email" placeholder="Enter email" value={email} />
                        </li>
                        <li>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="confirmPassword">Confirm password</label>
                            <input type="password" id="confirmPassword" placeholder="Enter password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        </li>
                        <li>
                            <button className="button wide">Update</button>
                        </li>
                    </ul>
                )}
            </form>
        </div>
    )
}

export default Profile;