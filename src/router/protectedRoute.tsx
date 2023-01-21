import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken, setUserData } from "../store/reducers/userSlice";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { socket, SocketContext } from "../context/socket";

const ProtectedRoute = ({ children }: any) => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(process.env.REACT_APP_API_URL + '/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>

  if (data) {
    dispatch(setUserData(data.user))
    socket.auth = { token }
    socket.connect().on('connect_error',(e)=>{
      if(e.message === '401'){
        dispatch(logout())
      }
    })
  }



  return (
    <React.Fragment>
      <SocketContext.Provider value={socket}>
        {children}
      </SocketContext.Provider>
    </React.Fragment>
  );
};

export default ProtectedRoute;
