import React, { useEffect } from "react";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/SideBar/Sidebar";
import { selectToken, selectUser } from "./store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login/Login";
import ServersList from "./Components/ServersList/ServersList";
import ProtectedRoute from "./router/protectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);

  document.onvisibilitychange = () => {
    if (user.uid) {
      let status = document.visibilityState === "visible" ? "online" : "away";

    }
  };

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className="flex flex-row h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <ServersList />
              <Sidebar />
              <Chat />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
