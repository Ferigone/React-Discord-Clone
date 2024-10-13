import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Login from "@pages/login/Login";
import ProtectedRoute from "./router/protectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();

  document.onvisibilitychange = () => {
    // if (user.uid) {
    //   let status = document.visibilityState === "visible" ? "online" : "away";

    // }
  };

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className="dark flex flex-row h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={"/app"} />} />
          <Route path="/app/*" element={
            <ProtectedRoute />
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
