import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUserData } from "@store/reducers/userSlice";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket, SocketContext } from "@context/socket";
import GetServer from "@utils/queries/GetServer";
import { setServerInfo } from "@store/reducers/serverSlice";
import ServersList from "@organisms/ServersList/ServersList";
import Sidebar from "@organisms/SideBar/Sidebar";
import Chat from "@organisms/Chat/Chat";
import NoServer from "@organisms/Utilities/NoServer";
import Settings from "@pages/Settings";
import { selectLastSelectedServer, setLastSelectedServer } from "@store/reducers/appSlice";
import { getCookie } from "@utils/cookies"; // Import function to get token from cookies
import { socketService } from "@services/socketService";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  
  const lastSelectedServer = useSelector(selectLastSelectedServer);
  const serverID = params['*']?.split('/')[1];

  // Get token from cookies
  const token = getCookie('token'); // Assuming the cookie is named 'token'

  // Fetch user data
  const { isLoading: isUserLoading, data: user, error: userError } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  // Fetch server data if serverID exists
  const { data: serverData, error: serverError } = useQuery({
    queryKey: ['server', serverID],
    queryFn: () => GetServer(serverID || ""),
    refetchOnWindowFocus: false,
    enabled: !!serverID,
  });

  // Manage socket connection
  useEffect(() => {

    if(!token) {
      dispatch(logout());
      navigate('/login');
    }

    if (user) {
      dispatch(setUserData(user.user));
      socketService.init(token || '');

      // Cleanup socket connection when component unmounts
      return () => {
        socketService.disconnect();
      };
    }
  }, [user, token, dispatch]);

  // Update Redux with server data
  useEffect(() => {
    if (serverData) {
      dispatch(setServerInfo(serverData));

      if (serverData._id) {
        dispatch(setLastSelectedServer({ server_id: serverData._id }));
      }
    }

    if (lastSelectedServer?.server_id && !serverID && window.location.pathname !== '/app/settings') {
      navigate(`/app/server/${lastSelectedServer.server_id}`);
    }
  }, [serverData, serverID, lastSelectedServer, dispatch]);

  if (isUserLoading) return <div>Loading user data...</div>;
  if (userError) return <div>Error loading user data</div>;
  if (serverError) return <div>Error loading server data</div>;

  return (
    <SocketContext.Provider value={socket}>
      <ServersList />
      <Routes>
        <Route path="/" element={<NoServer />} />
        <Route path="/server/:server_id?/channel?/:channel_id?" element={
          <>
            <Sidebar />
            <Chat />
          </>
        } />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </SocketContext.Provider>
  );
};

export default ProtectedRoute;
