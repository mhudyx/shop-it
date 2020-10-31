import { combineReducers } from 'redux';
import { productsList,  productDetails, productDelete, productSave } from './product.reducer';
import { userSignin, userRegister } from './user.reducer';
import { cartList } from './cart.reducer';
import { orderCreate } from './order.reducer';


const rootReducer = combineReducers({
    productsList,
    productDetails,
    productSave,
    productDelete,
    userSignin,
    userRegister,
    cart: cartList,
    orderCreate,
  });
  
  export default rootReducer;