import React, { useEffect, useState } from "react";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../../store/reducers/userSlice";

import { MdExpandMore } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { TbLogout } from "react-icons/tb";
import { RiSettings5Fill, RiAddFill } from "react-icons/ri";
import {
  selectChannels,
  selectServer,
  setServerChannels,
} from "../../../store/reducers/serverSlice";
import CreateChannel from "../../../utils/queries/CreateChannel";
import NewChannelModal from "../Modals/NewChannelModal";
import GetChannels from "../../../utils/queries/GetChannels";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

function Sidebar() {
  const user = useSelector(selectUser);
  const server = useSelector(selectServer);
  const channels = useSelector(selectChannels);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const [addChannelModalState, setAddChannelModalState] = useState(false);
  useQuery({
    queryKey: ["channels", server._id],
    queryFn: () => {
      GetChannels(server._id).then((data) => {
        dispatch(setServerChannels(data));
      });
      return channels;
    },
    refetchOnWindowFocus: false,
    enabled: !!server._id,
  });

  const handleAddChannel = (name: string) => {
    if (name) {
      CreateChannel({
        server_id: server._id,
        name,
      });
    }
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col bg-primary min-w-[240px] w-[240px] mx-2 rounded-2xl h-full">
        <div className="flex flex-row justify-between items-center px-5 h-[55px] text-white border-b border-black cursor-pointer duration-100">
          <h4 className="font-semibold">{server.name}</h4>
          <MdExpandMore className="w-6 h-6" />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="w-full px-3 my-5">
            <Button
              size="sm"
              className="w-full bg-secondary text-white font-bold"
              onPress={() => {
                setAddChannelModalState(true);
              }}
            >
              Create Channel
            </Button>
          </div>

          <div className="px-2">
            {channels?.map(({ _id, name }: { _id: string; name: string }) => (
              <SidebarChannel key={_id} id={_id} channelName={name} />
            ))}
          </div>
        </div>
        <NewChannelModal
          visible={addChannelModalState}
          setVisible={setAddChannelModalState}
          title="Create Channel"
          addChannel={handleAddChannel}
        />
      </div>
      <div className="h-[75px] flex flex-row items-center justify-between px-2 bg-primary rounded-2xl mx-2 mt-2">
        <div className="flex flex-row items-center">
          <img src={user?.photo || `https://via.placeholder.com/150/000000/FFFFFF/?text=${user.username[0]}`} className="h-9 w-9 rounded-full mr-2" alt="" />
          <div className="flex flex-col cursor-pointer">
            <span className="text-white font-bold text-sm">
              {user?.username}
            </span>
            <span className="text-gray text-xs font-semibold">
              #{user?.id.substring(0, 6).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center text-gray-500">
          <button className="h-8 w-8 flex justify-center items-center hover:bg-gray-700 rounded-md">
            <RiSettings5Fill
              className="h-6 w-6 fill-primary-text hover:fill-lighter-hover"
              onClick={() => {
                navigate("/app/settings");
              }}
            />
          </button>
          <button className="h-8 w-8 flex justify-center items-center hover:bg-gray-700 rounded-md">
            <TbLogout
              className="h-8 w-8 fill-primary-text hover:fill-lighter-hover"
              onClick={() => {
                dispatch(logout());
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
