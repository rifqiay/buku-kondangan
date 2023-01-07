import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { RootReducer } from "./reducer/RootReducer";

export const Store = createStore(RootReducer, applyMiddleware(thunk));
