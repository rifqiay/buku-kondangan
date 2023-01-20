import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

export const register = createAsyncThunk(
  "auth/register",
  async ({ values, toast, setLoading, navigate, handleReset }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        values
      );
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/login");
        handleReset();
      }, 3000);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ values, toast, setLoading, navigate, handleReset }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        values
      );
      toast.success(response.data.message);
      // console.log(response);
      localStorage.setItem("token", response.data.data.token);
      setTimeout(() => {
        navigate("/home");
        handleReset();
      }, 3000);
      // console.log(response);
      return response.data.data;
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
);

export const authEntity = createEntityAdapter({
  selectId: (auth) => auth.id,
});

const authSlice = createSlice({
  name: "auth",
  initialState: authEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      authEntity.addOne(state, action.payload);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      authEntity.addOne(state, action.payload);
    });
  },
});

export const authSelector = authEntity.getSelectors((state) => state.auth);
export default authSlice.reducer;
