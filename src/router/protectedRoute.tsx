import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken, setUserData } from "../store/reducers/userSlice";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";
import { socket, SocketContext } from "../context/socket";
import GetServer from "../utils/queries/GetServer";
import { setServerInfo, setServerChannels } from "../store/reducers/serverSlice";
import GetChannels from "../utils/queries/GetChannels";
import GetChannelInfo from "../utils/queries/GetChannelInfo";
import { setChannelInfo } from "../store/reducers/channelSlice";
import { Router } from 'express';
import ServersList from "../Components/ServersList/ServersList";
import Sidebar from "../Components/SideBar/Sidebar";
import Chat from "../Components/Chat/Chat";
import NoServer from "../Components/Utilities/NoServer";
import Settings from "../pages/Settings";
import { selectLastSelectedServer, setLastSelectedServer } from "../store/reducers/appSlice";

const ProtectedRoute = ({ children }: any) => {
  const lastSelectedServer = useSelector(selectLastSelectedServer);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  if (!token) {
    navigate("/login");
  }

  const { isLoading, isError, data: user, error } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(process.env.REACT_APP_API_URL + '/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });


  let serverID = params['*']?.split('/')[1];

  const { isLoading: isLoadingServer, data: serverData } = useQuery({
    queryKey: ['server', serverID],
    queryFn: () => {
      return GetServer(serverID || "")
    },
    refetchOnWindowFocus: false,
    enabled: !!serverID
  });

  if (user) {
    dispatch(setUserData(user.user));
    socket.auth = { token }
    socket.connect().on('connect_error', (e) => {
      if (e.message === '401') {
        dispatch(logout())
      }
    })
  }

  if (serverData) {
    dispatch(setServerInfo(serverData))
  }

  React.useEffect(() => {
    console.log(params)
    let server: any = serverData;
    if(server?._id) {
      dispatch(
        setLastSelectedServer({
          server_id: server._id,
        })
      );
    }

    if(lastSelectedServer?.server_id && !serverID && window.location.pathname !== '/app/settings') {
      navigate('/app/server/' + lastSelectedServer.server_id)
    }
  }, [serverData])



  if (isLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <SocketContext.Provider value={socket}>
        <ServersList />
        <Routes>
          <Route path="/" element={<NoServer />} />
          <Route path="/server/:server_id?/channel?/:channel_id?" element={
            <React.Fragment>
              <Sidebar />
              <Chat />
            </React.Fragment>
          } />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SocketContext.Provider>
    </React.Fragment>
  );
};

export default ProtectedRoute;
