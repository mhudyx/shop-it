import { combineReducers } from 'redux';

import { productList } from './product.reducer';
import { userSignin, userRegister } from './user.reducer';

const rootReducer = combineReducers({
    productList,
    userSignin,
    userRegister
  });
  
  export default rootReducer;