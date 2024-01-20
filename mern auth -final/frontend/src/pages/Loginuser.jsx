// LoginUser.jsx
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "../app/slices/userApiSlice";
import { PulseLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setCredentials } from "../app/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredentials = {
        email,
        password,
      };

      // Dispatch the login mutation
      const result = await login(userCredentials).unwrap();

      // Handle success
      toast.success("login successful");
      console.log(result.data);
      dispatch(setCredentials(result));
      // Clear the form after successful login
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (error) {
      // Handle error
      toast.error(error?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md border mx-auto mt-8 p-4 bg-white rounded shadow-lg relative">
      <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="border p-2 pl-10 w-full"
            placeholder="Email"
            required
          />
        </div>
        <div className="relative mb-4">
          <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="border p-2 pl-10 w-full"
            placeholder="Password"
            required
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </div>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? <PulseLoader color="#ffffff" size={8} /> : "Login"}
        </button>
      </form>
      <p className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link className="text-blue-600" to="/register">
          Register here
        </Link>
      </p>
     
    </div>
  );
};

export default LoginUser;
