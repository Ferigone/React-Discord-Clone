import React, { useEffect } from "react";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/SideBar/Sidebar";
import { selectUser } from "./store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login/Login";
import { login, logout } from "./store/reducers/userSlice";
import ServersList from "./Components/ServersList/ServersList";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  document.onvisibilitychange = () => {
    if (user.uid) {
      let status = document.visibilityState === "visible" ? "online" : "away";
      
    }
  };

  useEffect(() => {
    
  }, [dispatch]);

  return (
    <div className="flex flex-row h-screen">
      {user ? (
        <>
          <ServersList />
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
