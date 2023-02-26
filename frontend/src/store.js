import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchReducer, productReducer } from "./reducers/productReducers";

const reducer = combineReducers({
    search: searchReducer,
    product: productReducer,
});

export const store = configureStore({
    reducer,
});
