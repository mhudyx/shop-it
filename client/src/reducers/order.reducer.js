import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE, ORDER_CREATE_RESET
} from '../constans';

export const orderCreate = (state = {}, action) => {

    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return { loading: true };
        
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload };

        case ORDER_CREATE_FAILURE:
            return { loading: false, error: action.payload };

        case ORDER_CREATE_RESET:
            return {};

        default:
            return state;
    }
};