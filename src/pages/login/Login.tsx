// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/authContext";
import "./login.scss";
import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/useTypedSelector";
import { loginUser } from "../../redux/features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  // const from = location?.state?.from?.pathname;
  // console.log(from);
  // const [formError, setFormError] = useState();
  // const [formError, setFormError] = useState<FormError>(initialFormError);
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email Required"),
    password: Yup.string().required("Password Required"),

    // password: Yup.string().required("Required"),
    // confirm_password: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setLogging(true);
      console.log("This is the register value", values);

      try {
        const response = await dispatch(loginUser(values));
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
          setTimeout(() => {
            navigate("/");
          }, 3000);
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
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form onSubmit={formik.handleSubmit}>
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
            {formik.touched.email && formik.errors.email ? (
              <p className={`errorMsg`}>{formik.errors.email}</p>
            ) : null}
            {formik.touched.password && formik.errors.password ? (
              <p className={`errorMsg`}>{formik.errors.password}</p>
            ) : null}

            <button type="submit" disabled={logging}>
              {logging ? (
                <CircularProgress size={20} style={{ color: "#fff" }} />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
