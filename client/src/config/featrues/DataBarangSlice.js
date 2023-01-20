import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getDataBarang = createAsyncThunk(
  "dataBarang/getDataBarang",
  async ({ id, key }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/barang/${id}${
          key ? `?search=${key}` : ""
        }`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const createDataBarang = createAsyncThunk(
  "dataBarang/createDataBarang",
  async ({ values, toast, handleReset }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/barang/create",
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

export const deleteDataBarang = createAsyncThunk(
  "dataBarang/deleteDataBarang",
  async ({ idTamu, toast, setIsDeleted, setShow, setIsChecked }) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/barang/delete/${idTamu}`
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

export const updateDataBarang = createAsyncThunk(
  "dataBarang/updateDataBarang",
  async ({ values, handleReset, idsTamu, navigate, toast }) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/barang/edit/${idsTamu}`,
        values
      );
      toast.success(response.data.message);
      navigate("/barang");
      handleReset();
      return response.data.data[0];
    } catch (error) {
      console.log(error);
    }
  }
);

export const dataBarangEntity = createEntityAdapter({
  selectId: (barang) => barang.id,
});

const dataBarangSlice = createSlice({
  name: "barang",
  initialState: dataBarangEntity.getInitialState(),
  extraReducers: (builder) => {
    builder.addCase(getDataBarang.fulfilled, (state, action) => {
      dataBarangEntity.setAll(state, action.payload);
    });
    builder.addCase(createDataBarang.fulfilled, (state, action) => {
      dataBarangEntity.addOne(state, action.payload);
    });

    builder.addCase(deleteDataBarang.fulfilled, (state, action) => {
      dataBarangEntity.removeOne(state, action.payload);
    });
    builder.addCase(updateDataBarang.fulfilled, (state, action) => {
      dataBarangEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
  },
});

export const DataBarangSelector = dataBarangEntity.getSelectors(
  (state) => state.barang
);
export default dataBarangSlice.reducer;
