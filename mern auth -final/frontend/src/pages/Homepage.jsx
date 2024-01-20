// Homepage.jsx

import { Link } from "react-router-dom";

const Homepage = () => {
  const projectName = "MERN-AUTH";
  const createdBy = "Ajith";

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h1 className="text-2xl text-center font-bold mb-4">
        Welcome to {projectName} project by {createdBy}
      </h1>
      <p className="text-lg text-justify text-gray-700 mb-8">
        MERN-AUTH is a full-stack authentication project built using the MERN
        (MongoDB, Express, React, Node.js) stack. It provides user registration,
        login, and authentication features. The project is created by Ajith and
        aims to showcase a secure and scalable authentication system.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
