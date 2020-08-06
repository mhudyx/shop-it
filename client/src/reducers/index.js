import { combineReducers } from 'redux';

import { productList } from './product.reducer';

const rootReducer = combineReducers({
    productList,
  });
  
  export default rootReducer;