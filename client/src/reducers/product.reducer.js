import {
    PRODUCTS_GET_REQUEST, PRODUCTS_GET_SUCCESS, PRODUCTS_GET_FAILURE,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAILURE,
    PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAILURE,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAILURE
} from '../constans';

const initialState = {
    loading: {},
    products: [],
    product: {}
}

function productDetails(state = initialState, action) {

    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true };
        
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };

        case PRODUCT_DETAILS_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

function productsList(state = initialState, action) {

    switch(action.type) {
        case PRODUCTS_GET_REQUEST:
            return { loading: true, products: [] };

        case PRODUCTS_GET_SUCCESS:
            return { loading: false, products: action.payload };

        case PRODUCTS_GET_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;

    }
}

function productDelete(state = initialState, action) {

    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };

        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_DELETE_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;

    }
}

function productSave(state = initialState, action) {

    switch(action.type) {
        case PRODUCT_SAVE_REQUEST:
            return { loading: true };

        case PRODUCT_SAVE_SUCCESS:
            return { loading: false, success: true, product: action.payload };

        case PRODUCT_SAVE_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;

    }
}

export { productsList, productDetails, productDelete, productSave };