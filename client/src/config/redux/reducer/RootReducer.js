import { combineReducers } from "redux";
import { AuthReducer } from "./Auth";
import { createReducers } from "./Create";
import { getReducers } from "./Get";

export const RootReducer = combineReducers({
  auth: AuthReducer,
  get: getReducers,
  create: createReducers,
});
