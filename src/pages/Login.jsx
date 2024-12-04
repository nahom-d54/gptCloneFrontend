import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useLoginMutation } from "../services/auth/authApiSlice";
import { useEffect, useState } from "react";
import Toast from "../components/Toast";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation();
  const [statusMsg, setStatusMsg] = useState(null);
  const navigate = useNavigate();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const response = await login(values);

      if (isError) {
        setStatusMsg(response?.error?.data?.error ?? "An Error Occured");
      }
    },
  });
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);
  return (
    <div
      className={`flex justify-center items-center w-full h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-white dark:from-gray-700 dark:via-gray-900 dark:to-black`}
    >
      {(isError || isSuccess) && statusMsg && (
        <Toast
          message={isError ? statusMsg : "Authentication Successfull"}
          type={isError ? "error" : "success"}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-8200 dark:bg-gray-800 p-8 rounded-lg shadow-lg text-black dark:text-white flex flex-col gap-6"
      >
        <h1 className="text-center text-3xl font-bold mb-4">Login</h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold">
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
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-semibold">
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
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-gray-600 dark:bg-gray-400 rounded-md hover:bg-gray-700 dark:hover:bg-gray-500 transition duration-300"
        >
          {isLoading ? "Logging In..." : "Login"}
        </button>

        <div className="flex justify-between mt-4 text-sm">
          <Link
            to={"/auth/register"}
            className="hover:underline"
          >{`Don't have an account?`}</Link>
          <Link to={"/forgot-password"} className="hover:underline">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
