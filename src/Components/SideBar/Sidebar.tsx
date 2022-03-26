import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/reducers/userSlice";
import db, { auth } from "../../utils/firebase";
import IconButton from "@material-ui/core/IconButton";

import {
  MdExpandMore,
  MdAddCircle,
  MdOutlineSignalCellularAlt,
  MdInfo,
  MdCall,
  MdLogout,
  MdMic,
} from "react-icons/md";

import { BsHeadphones } from "react-icons/bs";

import { RiSettings5Fill, RiAddFill } from "react-icons/ri";



function Sidebar() {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot: any) => {
      setChannels(
        snapshot.docs.map((doc: any) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      );
    });
  }, []);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      db.collection("channels").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div className="flex flex-col bg-[#2f3136] min-w-[240px] w-[240px]">
      <div className="flex flex-row justify-between items-center px-[16px] h-[52px] text-white border-b-[1px] border-b-black cursor-pointer hover:bg-[#36393fc9] duration-100">
        <h4 className="font-semibold">SiecMC.PL</h4>
        <MdExpandMore className="w-6 h-6" />
      </div>

      <div className="sidebar__channels">


        <div className="flex row items-center justify-between">
          <div className="flex row items-center justify-center text-[gray] hover:text-gray-300 cursor-pointer">
            <button className="mx-1">
              <MdExpandMore />
            </button>
            <h4 className="flex items-center">Channels Category</h4>
          </div>
          <IconButton className="iconBtn">
            <RiAddFill
              onClick={handleAddChannel}
              className="sidebar__addChannel"
            />
          </IconButton>
        </div>


        <div className="sidebar__channelslist">
          {channels.map(({ id, channel }: { id: string; channel: any }) => (
            <SidebarChannel
              key={id}
              id={id}
              channelName={channel.channelName}
            />
          ))}
        </div>
      </div>
      <div className="h-[53px] flex flex-row items-center justify-between px-[8px] bg-[#292B2F]">
        <div className="flex flex-row items-center">
          <img
            src={user.photo}
            className="h-[32px] w-[32px] rounded-3xl mr-2"
            alt=""
          />
          <div className="flex flex-col cursor-pointer">
            <span className="text-white font-bold text-[14px]">
              {"Ferigone"}
            </span>
            <span className="text-[#8b919b] text-[12px] font-semibold mt-[-3px]">
              #{user.uid.substring(0, 6).toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-center text-[#B9BBBE]">
          <button className="h-[32px] w-[32px] flex justify-center items-center hover:bg-[#36393f] rounded-[5px]">
            <MdMic className="h-[20px] w-[20px]" />
          </button>
          <button className="h-[32px] w-[32px] flex justify-center items-center hover:bg-[#36393f] rounded-[5px]">
            <BsHeadphones className="h-[20px] w-[20px]" />
          </button>
          <button className="h-[32px] w-[32px] flex justify-center items-center hover:bg-[#36393f] rounded-[5px]">
            <RiSettings5Fill
              className="h-[20px] w-[20px]"
              onClick={() => {
                db.collection("users")
                  .doc(user.uid)
                  .update({
                    status: "offline",
                    timestamp: Date.now(),
                  })
                  .then(() => {
                    auth.signOut();
                  });
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
