import { Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, setUserData } from "@store/reducers/userSlice";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { socket, SocketContext } from "@context/socket";
import ServersList from "@organisms/ServersList/ServersList";
import Sidebar from "@organisms/SideBar/Sidebar";
import Chat from "@organisms/Chat/Chat";
import NoServer from "@organisms/Utilities/NoServer";
import { getCookie } from "@utils/cookies"; // Import function to get token from cookies
import { socketService } from "@services/socketService";
import useUserStatus from "@hooks/useUserStatus";
import GetServers from "@utils/queries/GetServers";
import { setServerList } from "@store/reducers/serverListSlice";
import { CircularProgress } from "@nextui-org/react";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useUserStatus();

  // Get token from cookies
  const token = getCookie("token"); // Assuming the cookie is named 'token'

  // Fetch user data
  const {
    isLoading: isUserLoading,
    data: user,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_APP_API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: isServerListLoading,
    data,
    error: serverListError,
  } = useQuery({
    queryKey: ["serversList"],
    queryFn: () => GetServers().then((data) => dispatch(setServerList(data))),
    enabled: !!user,
    refetchOnWindowFocus: false,
  });

  // Manage socket connection
  useEffect(() => {
    if (!token) {
      dispatch(logout());
      navigate("/login");
    }

    if (user) {
      dispatch(setUserData(user.user));
      socketService.init(token || "");
      // Cleanup socket connection when component unmounts
      return () => {
        socketService.disconnect();
      };
    }
  }, [user, token]);

  if (isUserLoading || isServerListLoading)
    return (
      <div className="flex justify-center items-center w-full">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-blue",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-white",
            label: "text-white font-semibold",
          }}
          label="Initializing..."
          
        />
      </div>
    );

  if (userError) return <div>Error loading user data</div>;
  if (serverListError) return <div>Error loading server data</div>;

  return (
    <SocketContext.Provider value={socket}>
      <ServersList />
      <Routes>
        <Route path="/" element={<NoServer />} />
        <Route
          path="/server?/:server_id?/channel?/:channel_id?"
          element={
            <>
              <Sidebar />
              <Chat />
            </>
          }
        />
      </Routes>
    </SocketContext.Provider>
  );
};

export default ProtectedRoute;
