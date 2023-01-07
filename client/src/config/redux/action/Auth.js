import axios from "axios";

export const RegisterAction =
  (values, resetForm, setLoading, navigate) => async (dispatch) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/auth/register`,
        values
      );
      resetForm();
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: result.data.message,
      });
      navigate("/login");
      setLoading(false);
      console.log(result.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };

export const LoginAction =
  (values, setLoading, navigate, resetForm) => async (dispatch) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/auth/login`,
        values
      );
      localStorage.setItem("token", result.data.data.token);
      resetForm();
      navigate("/home");
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: result.data.data,
      });
      console.log(result.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.message);
    }
  };
