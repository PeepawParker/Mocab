import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useLoginFormik from "./useLoginFormik";
import SignUpForm from "../Modals/SignUpModal";
import { useState } from "react";

export default function LoginPage() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useLoginFormik(dispatch, navigate, toast);

  return (
    <>
      <h1>This is the login page</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          placeholder="email/username"
          name="username"
          id="username"
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        ></input>
        {formik.touched.username && formik.errors.username ? (
          <div style={{ color: "red" }}>{formik.errors.username}</div>
        ) : null}
        <input
          type="password"
          placeholder="password"
          name="password"
          id="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        ></input>
        {formik.touched.password && formik.errors.password ? (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        ) : null}
        <button type="submit">Login</button>
      </form>
      <p>
        Dont have an account?{" "}
        <SignUpForm
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
        />
      </p>
    </>
  );
}
