import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ShippingCheckout from '../../../components/ShippingCheckout';
import { createOrder } from '../../../actions/order.action';
import { ORDER_CREATE_RESET } from '../../../constans/order.const';
import './PlaceOrder.css';

const PlaceOrder = (props) => {
    const cart = useSelector(state => state.cart);
    if(!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0));
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice;

    const dispatch = useDispatch();

    useEffect(() => {
        if(success) {
            props.history.push('/order/' + order._id);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);

    const placeOrderHandler = () => {
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    };

    return (
        <div className="shipping-container">
            <ShippingCheckout step1 step2 step3 step4 />
            <div className="placeorder">
                <ul className="placeorder-container">
                    <li className="placeorder-item placeorder-header">
                        <h2>Shipping</h2>
                        <div><strong>Name: </strong>{cart.shippingAddress.fullName}</div>
                        <div><strong>Address: </strong>{cart.shippingAddress.address}, {cart.shippingAddress.postalCode} {cart.shippingAddress.city}, {cart.shippingAddress.country}</div>
                    </li>
                    <li className="placeorder-item placeorder-payment">
                        <h2>Payment</h2>
                        <div><strong>Method:</strong> {cart.paymentMethod}</div>
                    </li>
                    <li className="placeorder-item">
                        <h2>Products</h2>
                        <ul className="placeorder-products">
                            {cart.cartItems.map(item => (
                                <li key={item.product} className="placeorder-product">
                                    <div className="placeorder-image"><img src={item.image} alt={item.name} /></div>
                                    <div className="placeorder-qty-name"><div className="placeorder-qty">{item.qty} x </div><div className="placeorder-name"><Link to={'/product/' + item.product}>{item.name}</Link></div></div>
                                    <div>${item.qty * item.price}</div>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>
                <ul className="placeorder-summary">
                    <h2>Summary</h2>
                    <li>
                        <div>Items</div>
                        <div>${cart.itemsPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${cart.shippingPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div><strong>${cart.totalPrice.toFixed(2)}</strong></div>
                    </li>
                    <li>
                        <button className="button wide continue" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>
                    </li>
                        {loading && <>Loading...</>}
                        {error && <>Loading...</>}
                </ul>
            </div>
        </div>
    )

}

export default PlaceOrder;