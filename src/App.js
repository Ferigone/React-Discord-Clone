import React, { useEffect } from 'react';
import './App.css';
import Chat from './Components/Chat/Chat';
import Sidebar from './Components/SideBar/Sidebar'
import { selectUser } from './store/reducers/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/login/Login';
import { auth } from './utils/firebase';
import { login, logout } from './store/reducers/userSlice'

function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // log In
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))
      } else {
        // log out
        dispatch(logout())
      }
    })
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
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
