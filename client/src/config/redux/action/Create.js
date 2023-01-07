import axios from "axios";

export const CreateDataUang = (values) => async (dispatch) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/uang/create",
      values
    );
    dispatch({
      type: "CREATE_DATA_UANG",
      payload: result.data.data,
    });
    console.log(result.data.message);
  } catch (error) {
    console.log(error);
  }
};

export const CreateDataBarang = (values) => async (dispatch) => {
  try {
    const result = await axios.post(
      "http://localhost:5000/api/barang/create",
      values
    );
    dispatch({
      type: "CREATE_DATA_BARANG",
      payload: result.data.data,
    });
    console.log(result.data.message);
  } catch (error) {
    console.log(error);
  }
};
