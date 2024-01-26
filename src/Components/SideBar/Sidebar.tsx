import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../store/reducers/userSlice";

import {
  MdExpandMore,
} from "react-icons/md";

import { Collapse, Text, Button } from "@nextui-org/react";
import { TbLogout } from "react-icons/tb";

import { RiSettings5Fill, RiAddFill } from "react-icons/ri";
import { selectChannels, selectServer, setServerChannels } from "../../store/reducers/serverSlice";
import CreateChannel from "../../utils/queries/CreateChannel";
import NewChannelModal from "../Modals/NewChannelModal";
import GetChannels from "../../utils/queries/GetChannels";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";



function Sidebar() {
  const user = useSelector(selectUser);
  const server = useSelector(selectServer);
  const channels = useSelector(selectChannels)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const [addChannelModalState, setAddChannelModalState] = useState(false);
  useQuery({
    queryKey: ['channels', server._id], queryFn: () => {
      GetChannels(server._id).then(data => {
        dispatch(setServerChannels(data))
      })
      return channels;
    }, refetchOnWindowFocus: false, enabled: !!server._id
  });

  const handleAddChannel = (name: string) => {
    if (name) {
      CreateChannel({
        server_id: server._id,
        name,
      })
    }
  };

  return (
    <div className="flex flex-col bg-[#2f3136] min-w-[240px] w-[240px]">
      <div className="flex flex-row justify-between items-center px-[16px] h-[52px] text-white border-b-[1px] border-b-black cursor-pointer hover:bg-[#36393fc9] duration-100">
        <h4 className="font-semibold">{server.name}</h4>
        <MdExpandMore className="w-6 h-6" />
      </div>

      <div className="sidebar__channels">

        <div className="w-full px-3 my-5">
          <Button shadow color="gradient" size="sm" className="w-full" onPress={() => {
            setAddChannelModalState(true)
          }}>Create Channel</Button>
        </div>

        <Collapse.Group>
          <div className="sidebar__channelslist">
            {channels?.map(({ _id, name }: { _id: string; name: string }) => (
              <SidebarChannel
                key={_id}
                id={_id}
                channelName={name}
              />
            ))}
          </div>
        </Collapse.Group>
      </div>
      <div className="h-[53px] flex flex-row items-center justify-between px-[8px] bg-[#292B2F]">
        <div className="flex flex-row items-center">
          <img
            src={user?.photo}
            className="h-[32px] w-[32px] rounded-3xl mr-2"
            alt=""
          />
          <div className="flex flex-col cursor-pointer">
            <span className="text-white font-bold text-[14px]">
              {user?.username}
            </span>
            <span className="text-[#8b919b] text-[12px] font-semibold mt-[-3px]">
              #{user?.id.substring(0, 6).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center text-[#B9BBBE]">
          <button className="h-[32px] w-[32px] flex justify-center items-center hover:bg-[#36393f] rounded-[5px]">
            <RiSettings5Fill
              className="h-[20px] w-[20px]"
              onClick={() => {
                navigate('/app/settings');
              }}
            />
          </button>
          <button className="h-[32px] w-[32px] flex justify-center items-center hover:bg-[#36393f] rounded-[5px]">
            <TbLogout
              className="h-[20px] w-[20px]"
              onClick={() => {
                dispatch(logout());
              }}
            />
          </button>
        </div>
      </div>

      <NewChannelModal
        visible={addChannelModalState}
        setVisible={setAddChannelModalState}
        title="Create Channel"
        addChannel={handleAddChannel}
      />
    </div>
  );
}

export default Sidebar;
