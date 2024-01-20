import { useEffect, useRef, useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateUserMutation } from "../app/slices/userApiSlice";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../app/slices/userSlice";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";
import app from "../firebase";

const UpdateUser = () => {
  // Get user information from the Redux store
  const userInfo = useSelector((state) => state.user.userInfo);
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [progresspercent, setProgresspercent] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
    setFormData(userInfo);
  }, [userInfo, image]);

  const handleImageUpload = (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, image: downloadURL });
        });
      }
    );
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const imageRef = useRef();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const updatedUserData = {
        name,
        email,
        password,
        image: formData.image || userInfo.image,
      };

      // Dispatch the update user mutation
      const result = await updateUser(updatedUserData).unwrap();

      // Handle success
      toast.success("User updated successfully");
      console.log(result.data);
      dispatch(setCredentials(result));
      navigate("/profile");
    } catch (error) {
      // Handle error
      toast.error(error?.data?.message || error.message);
      console.error(error);
    }
  };

  return (
    <div className="max-w-md border mx-auto mt-8 p-4 bg-white rounded shadow-lg relative">
      <h2 className="text-2xl text-center font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center space-y-4 mb-4">
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            ref={imageRef}
            hidden
            accept="image/*"
          />
          <img
            className="h-20 w-20 rounded-full object-cover cursor-pointer"
            src={formData.image || userInfo.image}
            alt="profile page"
            onClick={() => imageRef.current.click()}
          />
          <p>
            {progresspercent > 0 && progresspercent < 100 ? (
              <span className="text-gray-600">
                {` Uploading ${progresspercent}%`}
              </span>
            ) : progresspercent === 100 ? (
              <span className="text-green-600">
                Image uploaded successfully
              </span>
            ) : (
              ""
            )}
          </p>
        </div>
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
            onChange={handleChange}
            className="border p-2 pl-10 w-full"
            placeholder="New Password"
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
            onChange={handleChange}
            className="border p-2 pl-10 w-full"
            placeholder="Confirm New Password"
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
          {isLoading ? (
            <PulseLoader color="#ffffff" size={8} />
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
      <p className="text-center mt-4">
        <Link className="text-blue-600" to="/profile">
          Back to Profile
        </Link>
      </p>
    </div>
  );
};

export default UpdateUser;
