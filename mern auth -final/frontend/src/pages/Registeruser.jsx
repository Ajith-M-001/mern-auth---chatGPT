// RegisterUser.jsx
import { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterMutation } from "../app/slices/userApiSlice";
import { PulseLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const newUser = {
        name,
        email,
        password,
      };

      // Dispatch the register mutation
      const result = await register(newUser).unwrap();

      // Handle success
      toast.success(result.message);
      console.log(result.data);

      // Clear the form after successful registration
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/login");
    } catch (error) {
      // Handle error
      toast.error(error?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md border mx-auto mt-8 p-4 bg-white rounded shadow-lg relative">
      <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="border p-2 pl-10 w-full"
            placeholder="Name"
            required
          />
        </div>
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
        <div className="relative mb-4">
          <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="border p-2 pl-10 w-full"
            placeholder="Confirm Password"
            required
          />
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={toggleShowConfirmPassword}
          >
            {showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
          </div>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? <PulseLoader color="#ffffff" size={8} /> : "Register"}
        </button>
      </form>
      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link className="text-blue-600" to="/login">
          Login here
        </Link>
      </p>
     
    </div>
  );
};

export default RegisterUser;
