// Header.jsx
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  // Get user information from the Redux store
  const userInfo = useSelector((state) => state.user.userInfo);

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center">
          <Link to={"/"} className="text-2xl font-bold">
            MERN-AUTH
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {userInfo ? (
            // Display user information if user is logged in
            <div className="flex items-center space-x-3">
              <span className="text-gray-300">{userInfo.name}</span>
              <Link to={"/profile"}>
                <img
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                  src={userInfo.image}
                  alt="profile pic"
                />
              </Link>

              {/* Add user image display logic here */}
            </div>
          ) : (
            // Display authentication links if user is not logged in
            <>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
