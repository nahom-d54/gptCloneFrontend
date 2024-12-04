import * as Yup from "yup";
import { useFormik } from "formik";
import { FaUserEdit } from "react-icons/fa";
import Toast from "../components/Toast";
import { useChangePasswordMutation } from "../services/auth/authApiSlice";
import { useState } from "react";

const editProfileSchema = Yup.object().shape({
  previousPassword: Yup.string().required("Previous Password is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
function Profile() {
  const [changePassword, { isSuccess, isError, isLoading }] =
    useChangePasswordMutation();
  const [statusMsg, setStatusMsg] = useState(null);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      previousPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: editProfileSchema,
    onSubmit: async (values) => {
      const response = await changePassword(values);
      if (isError) {
        setStatusMsg(response?.error?.data?.error ?? "An Error Occured");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white font-semibold rounded-full mb-4">
          <FaUserEdit className="text-2xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to your profile page!
        </p>
        {(isError || isSuccess) && statusMsg && (
          <Toast
            message={isError ? statusMsg : "Authentication Successfull"}
            type={isError ? "error" : "success"}
          />
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="previousPassword"
              className="text-sm font-semibold text-black dark:text-white"
            >
              Previous Password
            </label>
            <input
              type="password"
              name="previousPassword"
              value={values.previousPassword}
              onChange={handleChange}
              className="bg-gray-300 dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white"
            />
            {errors.previousPassword && (
              <p className="text-red-500 text-sm">{errors.previousPassword}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold  text-black dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              className="bg-gray-300 dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold  text-black dark:text-white"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              className="bg-gray-300 dark:bg-gray-700 p-2 border border-gray-300 dark:border-gray-700 rounded-lg text-black dark:text-white"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-gray-500 text-white font-semibold p-2 rounded-lg"
          >
            {isLoading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
