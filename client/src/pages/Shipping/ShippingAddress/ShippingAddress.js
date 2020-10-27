import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from  '../../../actions/cart.action';
import ShippingCheckout from '../../../components/ShippingCheckout';

const ShippingAddress = props => {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!userInfo) {
        props.history.push('/signin');
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            saveShippingAddress({ fullName, address, city, postalCode, country })
        );
        props.history.push('/payment');
    };
    
    return (
        <div className="shipping-container">
            <ShippingCheckout step1 step2/>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li><h2>Shipping Address</h2></li>
                        <li>
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" placeholder="Enter full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </li>
                        <li>
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </li>
                        <li>
                            <label htmlFor="city">City</label>
                            <input type="city" id="city" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </li>
                        <li>
                            <label htmlFor="postalCode">Postal Code</label>
                            <input type="postalCode" id="postalCode" placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                        </li>
                        <li>
                            <label htmlFor="country">Country</label>
                            <input type="country" id="country" placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)} required />
                        </li>
                        <li>
                            <button className="button wide">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default ShippingAddress;