import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE, ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAILURE, ORDER_PAY_RESET,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAILURE,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAILURE, ORDER_DELETE_RESET,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAILURE, ORDER_DELIVER_RESET,
} from '../constans';

const initialState = {
    loading: {},
    order: {},
    orders: [],
}

export const orderCreate = (state = initialState, action) => {

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

export const orderDetails = (state = initialState, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true };

        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload };

        case ORDER_DETAILS_FAILURE:
            return { loading: false, error: action.payload };
            
        default:
            return state;
    }
};

export const orderPay = (state = initialState, action) => {
    switch(action.type) {
         case ORDER_PAY_REQUEST:
            return { loading: true };

        case ORDER_PAY_SUCCESS: 
            return { loading: false, success: true };

        case ORDER_PAY_FAILURE:
            return { loading: false, error: action.payload };

        case ORDER_PAY_RESET:
            return {};

        default:
            return state;
    }
}

export const orderList = (state = initialState, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
          return { loading: true };

        case ORDER_LIST_SUCCESS:
          return { loading: false, orders: action.payload };

        case ORDER_LIST_FAILURE:
          return { loading: false, error: action.payload };

        default:
          return state;
    }
}

export const orderDelete = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };

      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true };

      case ORDER_DELETE_FAILURE:
        return { loading: false, error: action.payload };

      case ORDER_DELETE_RESET:
        return {};

      default:
        return state;
    }
  };

  export const orderDeliver = (state = initialState, action) => {
    switch (action.type) {
      case ORDER_DELIVER_REQUEST:
        return { loading: true };

      case ORDER_DELIVER_SUCCESS:
        return { loading: false, success: true };

      case ORDER_DELIVER_FAILURE:
        return { loading: false, error: action.payload };

      case ORDER_DELIVER_RESET:
        return {};

      default:
        return state;
    }
  };