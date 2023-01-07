const initialValue = {
  getUang: [],
  getBarang: [],
};

export const getReducers = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_DATA_UANG":
      return {
        ...state,
        getUang: action.payload,
      };
    case "GET_DATA_BARANG":
      return {
        ...state,
        getBarang: action.payload,
      };

    default:
      return state;
  }
};
