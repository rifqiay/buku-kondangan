import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../featrues/AuthSlice";
import ProfileReducer from "../featrues/ProfileSlice";
import dataUangReducer from "../featrues/DataUangSlice";
import dataBarangReducer from "../featrues/DataBarangSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: ProfileReducer,
    uang: dataUangReducer,
    barang: dataBarangReducer,
  },
});
