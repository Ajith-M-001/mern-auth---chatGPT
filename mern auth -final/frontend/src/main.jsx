import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.jsx";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import RegisterUser from "./pages/Registeruser.jsx";
import LoginUser from "./pages/Loginuser.jsx";
import Profile from "./pages/Profile.jsx";
import UpdateUser from "./pages/Updateuser.jsx";
import Private from "./components/Private.jsx";

// You can do this:
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Homepage />} />
      <Route path="register" element={<RegisterUser />} />
      <Route path="login" element={<LoginUser />} />
      <Route element={<Private />}>
        <Route path="profile" element={<Profile />} />
        <Route path="update" element={<UpdateUser />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
