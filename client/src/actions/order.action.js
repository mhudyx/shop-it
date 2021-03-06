import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE, 
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAILURE,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAILURE,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAILURE,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAILURE,
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
        dispatch({ type: ORDER_CREATE_FAILURE, payload: error.response && error.response.data.message ? error.response.data.msg : error.message })
    }   
}

export const detailsOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get('/api/orders/' + orderId, {headers: { Authorization: 'Bearer ' + userInfo.token } });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_DETAILS_FAILURE, payload: message });
    }
};

export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST, payload: { order, paymentResult } });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.put('/api/orders/' + order._id + '/pay', paymentResult, { headers: { Authorization: 'Bearer ' + userInfo.token} } )
        dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_PAY_FAILURE, payload: message })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get('/api/orders', { headers: { Authorization: 'Bearer ' + userInfo.token} })
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_LIST_FAILURE, payload: message });
    }
}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELETE_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete('/api/orders/' + orderId, { headers: { Authorization: 'Bearer ' + userInfo.token} })
        dispatch({ type: ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_DELETE_FAILURE, payload: message });
    }
}

export const deliverOrder = (orderId) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DELIVER_REQUEST, payload: orderId });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.put(`/api/orders/${orderId}/deliver`, {}, { headers: { Authorization: 'Bearer ' + userInfo.token} })
        dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({ type: ORDER_DELIVER_FAILURE, payload: message });
    }
}