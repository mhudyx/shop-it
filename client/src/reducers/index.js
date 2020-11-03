import { combineReducers } from 'redux';
import { productsList,  productDetails, productDelete, productSave } from './product.reducer';
import { userSignin, userRegister } from './user.reducer';
import { cartList } from './cart.reducer';
import { orderCreate, orderDetails, orderPay } from './order.reducer';


const rootReducer = combineReducers({
    productsList,
    productDetails,
    productSave,
    productDelete,
    userSignin,
    userRegister,
    cart: cartList,
    orderCreate,
    orderDetails,
    orderPay,
  });
  
  export default rootReducer;