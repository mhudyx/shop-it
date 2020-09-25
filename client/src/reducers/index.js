import { combineReducers } from 'redux';

import { productList } from './product.reducer';
import { userSignin } from './user.reducer';

const rootReducer = combineReducers({
    productList,
    userSignin
  });
  
  export default rootReducer;