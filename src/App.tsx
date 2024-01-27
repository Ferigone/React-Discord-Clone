import React, { useEffect } from "react";
import Chat from "./Components/organisms/Chat/Chat";
import Sidebar from "./Components/organisms/SideBar/Sidebar";
import { selectToken, selectUser } from "./store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Components/pages/login/Login";
import ServersList from "./Components/organisms/ServersList/ServersList";
import ProtectedRoute from "./router/protectedRoute";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  document.onvisibilitychange = () => {
    // if (user.uid) {
    //   let status = document.visibilityState === "visible" ? "online" : "away";

    // }
  };

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className="dark flex flex-row h-screen p-2">
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
