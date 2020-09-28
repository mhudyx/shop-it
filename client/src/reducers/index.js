import { combineReducers } from 'redux';
import { productsList, productDelete, productSave } from './product.reducer';
import { userSignin, userRegister } from './user.reducer';

const rootReducer = combineReducers({
    productsList,
    productSave,
    productDelete,
    userSignin,
    userRegister
  });
  
  export default rootReducer;