import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../../actions/cart.action';
import ShippingCheckout from '../../../components/ShippingCheckout';
import './PaymentMethod.css';

const PaymentMethod = (props) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            savePaymentMethod(paymentMethod)
        );
        props.history.push('/placeorder');
    };

    return (
        <div className="shipping-container">
            <ShippingCheckout step1 step2 step3/>
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container form-shipping">
                        <li><h2>Payment Method</h2></li>
                        <li>
                            <div className="paymentmethod">
                                <input type="radio" id="paypal" value="PayPal" name="paymentMethod" required checked onChange={(e) => setPaymentMethod(e.target.value)} />
                                <label htmlFor="paypal">PayPal</label>
                            </div>
                            
                        </li>
                        <li>
                            <button className="button wide continue">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default PaymentMethod;