import axios from "axios";

export const getUangAction = (id, key) => async (dispatch) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/api/uang/${id}?search=${key}`
    );
    dispatch({
      type: "GET_DATA_UANG",
      payload: result.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBarangAction = (id, key) => async (dispatch) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/api/barang/${id}?search=${key}`
    );
    dispatch({
      type: "GET_DATA_BARANG",
      payload: result.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const hapusUangAction = (idTamu, setShow) => async (dispatch) => {
  try {
    const result = await axios.delete(
      `http://localhost:5000/api/uang/delete/${idTamu}`
    );
    dispatch({
      type: "DELETE_UANG",
      payload: result.data.message,
    });
    setShow(false);
  } catch (error) {
    console.log(error);
  }
};
