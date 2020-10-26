import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE
} from '../constans';

// const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const initialState = {
    loading: {},
    userSignin: { userInfo : {} }
};

export const userSignin = (state = initialState, action) => {

    switch(action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true };

        case USER_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_SIGNIN_FAILURE:
            return { loading: false, error: action.payload };
        
        case USER_SIGNOUT:
            return {};
            
        default:
            return state;
    }
}

export const userRegister = (state = initialState, action) => {

    switch(action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true };

        case USER_REGISTER_SUCCESS:
            return { loading: false, userInfo: action.payload };

        case USER_REGISTER_FAILURE:
            return { loading: false, error: action.payload };
            
        default:
            return state;
    }
}