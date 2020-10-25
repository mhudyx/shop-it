import React, { useEffect, useState } from 'react';
import { addToCart, removeFromCart } from '../../actions/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Cart.css';

const CartPage = (props) => {

    const productId = props.match.params.id;
    const propsNumber = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

    const [qty, setQty] = useState(propsNumber);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    
    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping');
    }

    return <div className="cart">
            <ul className="cart-list-container">
                <li className="cart-header">
                    <h3>Shopping List Cart</h3>
                </li>
                {cartItems.length === 0 ? <div>Cart is empty</div>
                    :
                    cartItems.map(item => 
                        <li className="cart-item">
                            <div className="cart-image">
                                <img src={item.image} alt="product-image"/>
                            </div>
                            <div className="cart-name"><Link to={'/product' + item.product}>{item.name}</Link></div>
                            <div className="cart-qty">
                                <button className="details-button" disabled={qty ? false : true} onClick={(e) => { setQty(qty - 1) }}>-</button>
                                <input className="details-input" type="number" name="qty" value={item.qty} max={item.quantityStock} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))} />
                                <button className="details-button" disabled={qty >= item.quantityStock ? true : false} onClick={(e) => { setQty(qty + 1 )}}>+</button>
                            </div>
                            <div className="cart-price">{item.price} $</div>
                            <div className="cart-delete button" onClick={() => removeFromCartHandler(item.product)}>Delete</div>
                        </li>
                        )
                }
            </ul>
            <div className="cart-summary">  
                <h2>
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                </h2>
                <button className="button wide" onClick={checkoutHandler} disabled={cartItems.length === 0}>Go to payment</button>
            </div>
    </div>
}

export default CartPage;