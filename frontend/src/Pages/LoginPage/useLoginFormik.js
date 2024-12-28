import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { userActions } from "../../Stores/userStore";

export default function useLoginFormik(dispatch, navigate, toast) {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "Username must be at least 4 characters long")
        .required("Required"),
      password: Yup.string()
        .min(8, "Password must be atleast 8 characters long")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/users/login",
          values,
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log("this got dispatched");
          dispatch(
            userActions.login({
              username: response.data.data.user.username,
              userId: response.data.data.user.user_id,
              privateStatus: response.data.data.user.private,
              timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            })
          );
        }

        navigate("/");
        toast.success("Logged in successfully");
      } catch (err) {
        const errorMsg = err.response
          ? err.response.data.message
          : "Login failed";
        toast.error(errorMsg);
        dispatch(userActions.loginFail(errorMsg));
      }
    },
  });

  return formik;
}
