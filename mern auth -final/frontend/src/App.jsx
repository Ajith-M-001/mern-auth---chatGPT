import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";



const App = () => {
  return (
    <>
      <Header />
      <ToastContainer autoClose={3000} />
      <Outlet />
    </>
  );
};

export default App;
