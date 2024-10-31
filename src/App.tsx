import Login from "@pages/login/Login";
import ProtectedRoute from "./router/protectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "@pages/register/Register";

function App() {
  return (
    <div className="dark flex flex-row h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/app"} />} />
          <Route path="/app/*" element={<ProtectedRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
