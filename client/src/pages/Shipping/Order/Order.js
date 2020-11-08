import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder, payOrder, deliverOrder } from '../../../actions/order.action';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../../../constans/order.const';
import './Order.css';

const Order = (props) => {

    const [pay, setPay] = useState(false);

    const orderId = props.match.params.id;

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderDetails;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch();

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;

    const orderDeliver = useSelector(state => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver, error: errorDeliver } = orderDeliver;

    useEffect(() => {
        if(!order || successPay || successDeliver || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            dispatch(detailsOrder(orderId));
        } 
    }, [dispatch, order, orderId, successPay, successDeliver]);

    const payHandler = () => {
        alert('Order paid!');
        setPay(true);
        dispatch(payOrder(order, 'completed'));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
      };

    return loading ? (
        <>Loading...</>
    ) :
    (
        <div className="shipping-container">
            <h1>Order ID - {order._id}</h1>
            <div className="placeorder">
                <ul className="placeorder-container">
                    <li className="placeorder-item placeorder-header">
                        <h2>Shipping</h2>
                        <div><strong>Name: </strong>{order.shippingAddress.fullName}</div>
                        <div><strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.postalCode} {order.shippingAddress.city}, {order.shippingAddress.country}</div>
                        {order.isDelivered ? (
                            <div className="info green">Delivered {order.deliveredAt}</div>
                        ) : (
                            <div className="info red">Not delivered</div>
                        )}
                    </li>
                    <li className="placeorder-item placeorder-payment">
                        <h2>Payment</h2>
                        <div><strong>Method:</strong> {order.paymentMethod}</div>
                        {order.isPaid ? (
                            <div className="info green">Paid at {order.paidAt}</div>
                        ) : (
                            <div className="info red">Not paid</div>
                        )}
                    </li>
                    <li className="placeorder-item">
                        <h2>Order Items</h2>
                        <ul className="placeorder-products">
                            {order.orderItems.map(item => (
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
                        <div>${order.itemsPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div>Shipping</div>
                        <div>${order.shippingPrice.toFixed(2)}</div>
                    </li>
                    <li>
                        <div>Order Total</div>
                        <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                    </li>
                    <li>
                        {!pay ? (
                            <button className="button wide continue" onClick={payHandler}>Pay</button>
                            )
                            :
                            (<></>)
                        }
                    </li>
                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <li>
                            {loadingDeliver ? <div>Loading...</div> : 
                            <button className="button wide continue" onClick={deliverHandler}>Deliver Order</button>
                            }
                        </li>
                    ) }
                </ul>
            </div>
        </div>
    )

}

export default Order;