import React from "react";
import { Formik, Form } from "formik";
import TextField from "./TextField";
import * as Yup from "yup";
import axios from "../Api/axios";
import { Link } from "react-router-dom";

const Signup = () => {
  // validation schema
  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    userRole: Yup.string().required("Role is required"), // Added role validation
  });

  // submit data
  const handleSubmit = (values, { resetForm }) => {
    axios
      .post("/users", values)
      .then((res) => {
        console.log("Successfully submitted", res.data);
        resetForm();
      })
      .catch((error) => {
        console.log("Error submitting data", error);
      });
  };

  return (
    <Formik
      validationSchema={validate}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <div>
          <main className="form-signin m-auto d-flex justify-content-center">
            <Form className="w-50 mt-5">
              <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="First Name"
                  name="firstName"
                  type="text"
                />
              </div>

              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="Last Name"
                  name="lastName"
                  type="text"
                />
              </div>

              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="Email"
                  name="email"
                  type="email"
                />
              </div>

              <div className="form-floating mb-4">
                <TextField
                  className="form-control"
                  label="Password"
                  name="password"
                  type="password"
                />
              </div>

              <div className="form-floating mb-5">
                <TextField
                  className="form-control"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                />
              </div>

              <div className="form-check text-start my-3">
                <TextField
                  className="form-check-input"
                  type="radio"
                  name="userRole"
                  value="User"
                  id="radioUser"
                  onChange={formik.handleChange}
                />
                <label className="form-check-label" htmlFor="radioUser">
                  User
                </label>
              </div>

              {/* Display validation error for role selection */}
              {formik.errors.userRole && formik.touched.userRole && (
                <div style={{ color: "red", fontSize: "14px" }}>
                  {formik.errors.userRole}
                </div>
              )}

              <button className="btn btn-primary w-100 py-2" type="submit">
                Sign Up
              </button>

              <p className="mt-2 mb-5 fs-5">
                Go to the{" "}
                <Link className="text-decoration-none" to="/">
                  Login page
                </Link>
                .
              </p>
            </Form>
          </main>
        </div>
      )}
    </Formik>
  );
};

export default Signup;
