import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE
} from '../constans/order.const';
import {
    CART_EMPTY
} from '../constans/cart.const'
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_CREATE_REQUEST, paylaod: order });
        const { userSignin : { userInfo } } = getState();
        const { data } = await axios.post('/api/orders', order, { headers: { Authorization: 'Bearer ' + userInfo.token } });
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order });
        dispatch({ type: CART_EMPTY });
        localStorage.removeItem('cartItems');
    } catch (error) {
        dispatch({ type: ORDER_CREATE_FAILURE, payload: error.response && error.response.data.msg ? error.response.data.msg : error.msg })
    }
    
}