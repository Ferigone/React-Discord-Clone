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

function ServersList() {
  const [modalState, setModalState] = useState<boolean>(false);
  const [servers, setServers] = useState<any>([]);
  const socket = useContext(SocketContext);

  const params = useParams();
  const navigate = useNavigate();

  const handleAddServer = (name: string, handleType: string) => {
    if (name.length < 3) return;

    if (handleType === "create") {
      CreateServer({
        name,
      }).then((res: any) => {
        if (res.server.id) {
          setModalState(false);
          navigate(`/app/server/${res.server.id}`);
        }
      });
    } else if (handleType === "join") {
      JoinServer({
        name,
      }).then((res: any) => {
        if (res.server.id) {
          setModalState(false);
          navigate(`/app/server/${res.server.id}`);
        }
      })
    }
  };

  useEffect(() => {
    GetServer().then((res: any) => {
      setServers(res.servers);
      console.log(res.servers);
    });

    socket.on("server", (data: any) => {
      setServers((prev: any) => [...prev, data]);
    });

    return () => {
      socket.off("server");
    };
  }, []);

  return (
    <>
      <div className="w-[72px] min-w-[72px] bg-primary flex flex-col items-center py-3">
        <div className="mb-2 bg-secondary group hover:bg-blue min-h-[48px] min-w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
          <SiDiscord className="fill-primary-text group-hover:fill-white h-7 w-7 duration-100" />
        </div>
        <div className="bg-[#2D2F32] h-[2px] w-[30%] mb-2" />

        <div className="block overflow-auto no-scrollbar">
          {servers.map((server: any) => (
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
