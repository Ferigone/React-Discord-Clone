import Login from "@pages/login/Login";
import ProtectedRoute from "./router/protectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="dark flex flex-row h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/app"} />} />
          <Route path="/app/*" element={<ProtectedRoute />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
