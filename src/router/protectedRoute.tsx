import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectToken, setUserData } from "../store/reducers/userSlice";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { socket, SocketContext } from "../context/socket";
import GetServer from "../utils/queries/GetServer";
import { setServerInfo } from "../store/reducers/serverSlice";
import ServersList from "../Components/organisms/ServersList/ServersList";
import Sidebar from "../Components/organisms/SideBar/Sidebar";
import Chat from "../Components/organisms/Chat/Chat";
import NoServer from "../Components/organisms/Utilities/NoServer";
import Settings from "../Components/pages/Settings";
import { selectLastSelectedServer, setLastSelectedServer } from "../store/reducers/appSlice";

const ProtectedRoute = () => {
  const lastSelectedServer = useSelector(selectLastSelectedServer);
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  if (!token) {
    navigate("/login");
  }

  const { isLoading, data: user } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(import.meta.env.VITE_APP_API_URL + '/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });


  const serverID = params['*']?.split('/')[1];

  const { data: serverData } = useQuery({
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
    const server: any = serverData;
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
