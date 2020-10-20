import {
    CART_ADD_ITEM, CART_REMOVE_ITEM
} from '../constans';

import Cookie from 'js-cookie';

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = {
    cartItems: []
}

function cartList(state = initialState, action){
    
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            if(product) {
                return {
                    cartItems: state.cartItems.map(x => x.product === product.product ? item : x)
                };
            }
            return { cartItems: [...state.cartItems, item] };
        
        case CART_REMOVE_ITEM:
            return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };

        default:
            return state;

    }
}

export { cartList };