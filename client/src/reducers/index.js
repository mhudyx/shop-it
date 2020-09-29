import { combineReducers } from 'redux';
import { productsList,  productDetails, productDelete, productSave } from './product.reducer';
import { userSignin, userRegister } from './user.reducer';

const rootReducer = combineReducers({
    productsList,
    productDetails,
    productSave,
    productDelete,
    userSignin,
    userRegister
  });
  
  export default rootReducer;