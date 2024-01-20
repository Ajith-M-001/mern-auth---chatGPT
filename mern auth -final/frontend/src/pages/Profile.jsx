import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useLogoutMutation,
  useDeleteUserMutation,
} from "../app/slices/userApiSlice";
import { clearCredentials } from "../app/slices/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user information from the Redux store
  const userInfo = useSelector((state) => state.user.userInfo);

  const { name, email, image } = userInfo;

  const [logout] = useLogoutMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleLogout = async () => {
    try {
      await logout();
      // Clear user info in Redux store and local storage
      dispatch(clearCredentials());
      navigate("/login");
      // Add any additional logic (redirect, etc.) if needed
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const confirmDeleteUser = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (isConfirmed) {
      handleDeleteUser();
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      // Clear user info in Redux store and local storage
      dispatch(clearCredentials());
      navigate("/login");
      // Add any additional logic (redirect, etc.) if needed
    } catch (error) {
      console.error("Delete user failed:", error);
    }
  };

  return (
    <div className="max-w-md mb-10 border mx-auto p-5 mt-8">
      <div className="flex flex-col space-y-4 text-center justify-center items-center space-x-4 mb-8">
        {image && (
          <img src={image} alt={name} className="w-fit h-fit object-cover" />
        )}
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-600">{email}</p>
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        <Link
          to="/update"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Profile
        </Link>
        <button
          className={`bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600`}
          onClick={confirmDeleteUser}
        >
          Delete Profile
        </button>
        <button
          className={`bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 `}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
