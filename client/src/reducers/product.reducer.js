import {
    PRODUCTS_GET_REQUEST,
    PRODUCTS_GET_SUCCESS,
    PRODUCTS_GET_FAILURE,
} from '../constans';

const initialState = {
    loading: {},
    productList: {}
}

function productList(state = initialState, action) {

    switch(action.type) {
        case PRODUCTS_GET_REQUEST:
            return { loading: true };

        case PRODUCTS_GET_SUCCESS:
            return { loading: false, productsList: action.payload };

        case PRODUCTS_GET_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;

    }
}

export { productList };