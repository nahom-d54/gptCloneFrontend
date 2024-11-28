import { useFormik } from "formik";
import { useState } from "react";

import * as Yup from "yup";

import { Link } from "react-router-dom";
import { useRegisterMutation } from "../services/auth/authApiSlice";
import Toast from "../components/Toast";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string(),
  username: Yup.string().required("UserName is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
const Register = () => {
  const [register, { isLoading, isSuccess }] = useRegisterMutation();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values);
      register(values);
    },
  });
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="flex justify-center items-center min-w-full h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-white dark:from-gray-700 dark:via-gray-900 dark:to-black">
      {isSuccess && <Toast message="Registration Successful" type="success" />}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-8200 dark:bg-gray-800 p-8 rounded-lg shadow-lg text-black dark:text-white flex flex-col gap-6"
      >
        <h1 className="text-center text-3xl font-bold mb-4">Register</h1>
        {step === 1 && (
          <>
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                />
                {errors.firstName && (
                  <div className="text-red-600 text-sm">{errors.firstName}</div>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
                />
                {errors.lastName && (
                  <div className="text-red-600 text-sm">{errors.lastName}</div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                User Name
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="UserName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
              {errors.username && (
                <div className="text-red-600 text-sm">{errors.username}</div>
              )}
            </div>
            <div>
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
              {errors.email && (
                <div className="text-red-600 text-sm">{errors.email}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
              {errors.password && (
                <div className="text-red-600 text-sm">{errors.password}</div>
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-300"
              />
              {errors.confirmPassword && (
                <div className="text-red-600 text-sm">
                  {errors.confirmPassword}
                </div>
              )}
            </div>
            <div className="flex justify-between gap-3">
              <button
                type="button"
                onClick={prevStep}
                className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isLoading ? "Registering..." : "Register"}
              </button>
            </div>
          </>
        )}

        <div className="flex justify-between mt-4 text-sm">
          <Link
            to={"/auth/login"}
            className="hover:underline"
          >{`Already have an account?`}</Link>
          <Link to={"/auth/forgot-password"} className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
