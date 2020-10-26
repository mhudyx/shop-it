import {
    CART_ADD_ITEM, CART_REMOVE_ITEM
} from '../constans/cart.const';

import axios from 'axios';

export const addToCart = (productId, qty) => async (dispatch, getState) => {

        const { data } = await axios.get('/api/products/' + productId);
        dispatch({
            type: CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                quantityStock: data.quantityStock,
                qty
            }
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

    
}