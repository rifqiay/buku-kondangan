import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getDataUang = createAsyncThunk(
  "dataUang/getDataUang",
  async ({ id, key }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/uang/${id}${key ? `?search=${key}` : ""}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createDataUang = createAsyncThunk(
  "dataUang/createDataUang",
  async ({ values, toast, handleReset }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/uang/create",
        values
      );
      toast.success(response.data.message);
      handleReset();
      // console.log(response);
      return response.data;
    } catch (error) {
      toast.error(error.data.message);
    }
  }
);

export const deleteDataUang = createAsyncThunk(
  "dataUang/deleteDataUang",
  async ({ idTamu, toast, setIsDeleted, setShow, setIsChecked }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/uang/delete/${idTamu}`
      );
      // console.log(response);
      toast.success(response.data.message);
      setIsDeleted(true);
      setShow(false);
      setIsChecked();
      setTimeout(() => {
        setIsDeleted(false);
      }, 1000);
      return idTamu;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateDataUang = createAsyncThunk(
  "dataUang/updateDataUang",
  async ({ values, handleReset, idsTamu, navigate, toast }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/uang/edit/${idsTamu}`,
        values
      );
      toast.success(response.data.message);
      navigate("/home");
      handleReset();
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);

export const dataUangEntity = createEntityAdapter({
  selectId: (uang) => uang.id,
});

const dataUangSlice = createSlice({
  name: "uang",
  initialState: dataUangEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getDataUang.fulfilled, (state, action) => {
      dataUangEntity.setAll(state, action.payload);
    });
    builder.addCase(createDataUang.fulfilled, (state, action) => {
      dataUangEntity.addOne(state, action.payload);
    });

    builder.addCase(deleteDataUang.fulfilled, (state, action) => {
      dataUangEntity.removeOne(state, action.payload);
    });
    builder.addCase(updateDataUang.fulfilled, (state, action) => {
      dataUangEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
  },
});

export const DataUangSelector = dataUangEntity.getSelectors(
  (state) => state.uang
);
export default dataUangSlice.reducer;
