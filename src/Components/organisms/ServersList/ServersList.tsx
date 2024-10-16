import { useState, useEffect, useContext } from "react";
import { SiDiscord } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdCompass } from "react-icons/io";
import CreateServer from "@utils/queries/CreateServer";
import GetServer from "@utils/queries/GetServers";
import { SocketContext } from "@context/socket";
import { Link, useParams, useNavigate } from "react-router-dom";

import NewServerModal from "../Modals/NewServerModal";
import { Tooltip } from "@nextui-org/react";

import JoinServer from "@utils/queries/JoinServer";

interface Server {
  id: string;
  name: string;
}

function ServersList() {
  const [modalState, setModalState] = useState<boolean>(false);
  const [servers, setServers] = useState<Server[]>([]);
  const socket = useContext(SocketContext);

  const params = useParams();
  const navigate = useNavigate();

  const handleAddServer = async (name: string, handleType: string) => {
    if (name.length < 3) return;

    try {
      let res;
      if (handleType === "create") {
        res = await CreateServer({ name });
      } else if (handleType === "join") {
        res = await JoinServer({ server_id: name });
      }

      if (res?.server?.id) {
        setModalState(false);
        navigate(`/app/server/${res.server.id}`);
      }
    } catch (error) {
      console.error("Error handling server:", error);
    }
  };

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await GetServer();
        setServers(res.servers);
        console.log(res.servers);
      } catch (error) {
        console.error("Error fetching servers:", error);
      }
    };

    fetchServers();

    const handleServerEvent = (data: Server) => {
      setServers((prev) => [...prev, data]);
    };

    socket.on("server", handleServerEvent);

    return () => {
      socket.off("server", handleServerEvent);
    };
  }, [socket]);

  return (
    <>
      <div className="w-[72px] min-w-[72px] bg-primary flex flex-col items-center py-3">
        <div className="mb-2 bg-secondary group hover:bg-blue min-h-[48px] min-w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
          <SiDiscord className="fill-primary-text group-hover:fill-white h-7 w-7 duration-100" />
        </div>
        <div className="bg-[#2D2F32] h-[2px] w-[30%] mb-2" />

        <div className="block overflow-auto no-scrollbar">
          {servers.map((server) => (
            <Tooltip
              content={server.name}
              placement="right"
              className="bg-blue text-white"
              key={server.id}
            >
              <Link
                to={`/app/server/${server.id}${
                  params.channel_id ? `/channel/${params.channel_id}` : ""
                }`}
              >
                <div className="mb-2 bg-secondary group hover:bg-blue h-[48px] w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
                  <span className="text-white text-[20px] mt-[-4px]">
                    {server.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </Link>
            </Tooltip>
          ))}
        </div>

        <button
          onClick={() => {
            setModalState(true);
          }}
          className="my-2 bg-secondary group hover:bg-blue min-h-[48px] min-w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer"
        >
          <AiOutlinePlus className="fill-blue group-hover:fill-white h-5 w-5 duration-100" />
        </button>
        <div className="mb-2 bg-secondary group hover:bg-blue min-h-[48px] min-w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
          <IoMdCompass className="fill-blue group-hover:fill-white h-5 w-5 duration-100" />
        </div>
      </div>

      <NewServerModal
        setVisible={setModalState}
        title="Create a new server"
        addServer={handleAddServer}
        visible={modalState}
      />
    </>
  );
}

export default ServersList;
