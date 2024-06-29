import "./register.scss";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { registerUser } from "../../redux/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Fullname Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLogging(true);
      console.log("This is the register value", values);

      try {
        const response = await dispatch(registerUser(values));
        console.log("This is user return value", response);
        if (response.payload.status === "success") {
          toast.success(`${response.payload.msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setLogging(false);
          navigate("/login");
        } else {
          toast.error(response.payload.msg, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLogging(false);
        }
      } catch (err: any) {
        console.log("Will this error log...", err);
        setLogging(false);
        setError(err.data.errors);
      } finally {
        setLogging(false);
      }
    },
  });

  // Clears the post verified error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 4000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Abbey Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Fullname"
              value={formik.values.fullname}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
            {formik.touched.fullname && formik.errors.fullname ? (
              <p className={`errorMsg`}>{formik.errors.fullname}</p>
            ) : null}
            {/* <input type="text" placeholder="Name" /> */}
            {formik.touched.password && formik.errors.password ? (
              <p className={`errorMsg`}>{formik.errors.password}</p>
            ) : null}
            {formik.touched.email && formik.errors.email ? (
              <p className={`errorMsg`}>{formik.errors.email}</p>
            ) : null}
            {error ? error : ""}
            <button type="submit" disabled={logging}>
              {logging ? (
                <CircularProgress size={20} style={{ color: "#fff" }} />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
