import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk("profile/getProfile", async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/v1/profile/${id}`
    );
    return response.data.data[0];
  } catch (error) {
    console.log(error);
  }
});

export const editProfile = createAsyncThunk(
  "profile/editProfiile",
  async ({ id, values }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/profile/edit/${id}`,
        values
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  user: "",
  isFulfiled: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getProfile.pending, (state, action) => {
      state.isFulfiled = true;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.isFulfiled = false;
      state.user = action.payload;
    });
    builder.addCase(editProfile.pending, (state, action) => {
      state.isFulfiled = true;
    });
    builder.addCase(editProfile.fulfilled, (state, action) => {
      state.isFulfiled = false;
      state.user = action.payload;
    });
  },
});

export default profileSlice.reducer;
