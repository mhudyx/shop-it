import {
    PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, PRODUCTS_GET_FAILURE
} from '../constans/product.const';

import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCTS_GET_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({ type: PRODUCTS_GET_SUCCESS, payload: data });
    }
    catch (error) {
        dispatch({ type: PRODUCTS_GET_FAILURE, payload: error.message });
    }
}