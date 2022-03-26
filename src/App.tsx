import React, { useEffect } from "react";
import Chat from "./Components/Chat/Chat";
import Sidebar from "./Components/SideBar/Sidebar";
import { selectUser } from "./store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/login/Login";
import db, { auth } from "./utils/firebase";
import { login, logout } from "./store/reducers/userSlice";
import ServersList from "./Components/ServersList/ServersList";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  document.onvisibilitychange = () => {
    if (user.uid) {
      let status = document.visibilityState === "visible" ? "online" : "away";
      db.collection("users")
        .doc(user.uid)
        .update({ status: status, timestamp: Date.now() });
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        db.collection("users")
          .doc(authUser.uid)
          .set({
            status: "online",
            timestamp: Date.now(),
            userData: {
              uid: authUser.uid,
              username: authUser.displayName,
              photo: authUser.photoURL,
            },
          });
        // log In
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
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
