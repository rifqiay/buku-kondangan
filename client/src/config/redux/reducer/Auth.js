const initialValue = {
  user: [],
};

export const AuthReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "REGISTER_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
