import { combineReducers } from 'redux';
import { productsList,  productDetails, productDelete, productSave } from './product.reducer';
import { userSignin, userRegister, userDetails, userUpdateProfile } from './user.reducer';
import { cartList } from './cart.reducer';
import { orderCreate, orderDetails, orderPay, orderList, orderDelete, orderDeliver } from './order.reducer';


const rootReducer = combineReducers({
    productsList,
    productDetails,
    productSave,
    productDelete,
    userSignin,
    userRegister,
    userDetails,
    userUpdateProfile,
    cart: cartList,
    orderCreate,
    orderDetails,
    orderPay,
    orderList,
    orderDelete,
    orderDeliver,
  });
  
  export default rootReducer;