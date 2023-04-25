import { configureStore } from "@reduxjs/toolkit";

import productsBasketReducer from "./slice/productsBasket";
import counterReducer from "./slice/counter";
import searchReducer from "./slice/search";
import valueReducer from "./slice/value";
import textReducer from "./slice/text";
import countBasketReducer from "./slice/countBasket";


import { compose } from "redux";

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = configureStore(
  {
    reducer: {
      countBasket: countBasketReducer,
      productsBasket: productsBasketReducer,
      text: textReducer,
      counter: counterReducer,
      search: searchReducer,
      value: valueReducer,
    },
  },
  compose(ReactReduxDevTools)
);

export default store;
