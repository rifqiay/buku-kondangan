const initialValues = {
  dataUang: [],
  dataBarang: [],
};

export const createReducers = (state = initialValues, action) => {
  switch (action.type) {
    case "CREATE_DATA_UANG ":
      return {
        ...state,
        dataUang: action.payload,
      };
    case "CREATE_DATA_BARANG ":
      return {
        ...state,
        dataBarang: action.payload,
      };
    default:
      return state;
  }
};
