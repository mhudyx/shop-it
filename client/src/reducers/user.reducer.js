import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE, USER_SIGNOUT,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAILURE,
    USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAILURE,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAILURE, USER_UPDATE_PROFILE_RESET,
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

export const userDetails = (state = initialState, action) => {
    switch(action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };

        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };

        case USER_DETAILS_FAILURE:
            return { loading: false, error: action.payload };

        default:
            return state;
    }
}

export const userUpdateProfile = (state = initialState, action) => {
    switch(action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { loading: true };

        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true };

        case USER_UPDATE_PROFILE_FAILURE:
            return { loading: false, error: action.payload };

        case USER_UPDATE_PROFILE_RESET:
            return {};

        default:
            return state;
    }
}