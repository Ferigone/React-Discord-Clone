import { useEffect, useState } from "react";
import SidebarChannel from "../SidebarChannel/SidebarChannel";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "@store/reducers/userSlice";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  useDisclosure,
} from "@nextui-org/react";
import { FaCog } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

import { MdExpandMore } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { RiSettings5Fill, RiFolderAddFill } from "react-icons/ri";
import { MdGroupAdd } from "react-icons/md";
import { TbDoorExit } from "react-icons/tb";

import CreateChannel from "@utils/queries/CreateChannel";
import NewChannelModal from "../Modals/NewChannelModal";
import { useNavigate, useParams } from "react-router-dom";
import { socketService } from "@services/socketService";
import User from "@molecules/User";
import {
  addServerChannel,
  selectServerById,
  selectServerChannels,
} from "@store/reducers/serverListSlice";
import ServerSettings from "@organisms/Modals/ServerSettings";

function Sidebar() {
  const { server_id } = useParams();
  const user = useSelector(selectUser);
  const server = useSelector(selectServerById(server_id || ""));
  const channels = useSelector(selectServerChannels(server_id || ""));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addChannelModalState, setAddChannelModalState] = useState(false);

  const handleAddChannel = (name: any) => {
    console.log("name", name);
    if (name) {
      CreateChannel({
        serverId: server?.id,
        ...name,
      }).then((data) => {
        setAddChannelModalState(false);
      });
    }
  };

  const handleChangeStatus = (status: string) => {
    socketService.emit("changeStatus", status);
  };

  useEffect(() => {
    socketService.emit("joinServer", server.id);

    return () => {
      socketService.emit("leaveServer", server.id);
    };
  }, [server.id]);

  useEffect(() => {
    socketService.on("newChannel", (channel) => {
      console.log(channel);
      dispatch(addServerChannel({ serverId: server.id, channel }));
    });

    return () => {
      socketService.off("newChannel");
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col bg-primary min-w-[240px] w-[240px] mx-2 rounded-b-2xl h-full">
        <Dropdown>
          <DropdownTrigger>
            <div className="flex flex-row justify-between items-center px-5 h-[55px] text-white border-b border-black cursor-pointer duration-100">
              <h4 className="font-semibold">{server.name}</h4>
              <MdExpandMore className="w-6 h-6" />
            </div>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownSection className="py-2">
              <DropdownItem
                endContent={<FaCog />}
                onClick={() => {
                  onOpen();
                }}
              >
                <span className="font-bold m-2">Server settings</span>
              </DropdownItem>
              <DropdownItem endContent={<MdGroupAdd />}>
                <span className="font-bold m-2">Invite people</span>
              </DropdownItem>
              <DropdownItem
                endContent={<FaCirclePlus />}
                onClick={() => {
                  setAddChannelModalState(true);
                }}
              >
                <span className="font-bold m-2">Create channel</span>
              </DropdownItem>
              <DropdownItem showDivider endContent={<RiFolderAddFill />}>
                <span className="font-bold m-2">Create category</span>
              </DropdownItem>
              <DropdownItem endContent={<TbDoorExit />} className="text-danger">
                <span className="font-bold m-2">Leave server</span>
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <div className="flex-1 overflow-y-auto">
          <div className="px-2 overflow-y-auto flex flex-col-reverse flex-grow scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
            <div className="">
              {channels?.map(
                ({
                  id,
                  name,
                  type,
                }: {
                  _id: string;
                  name: string;
                  type: string;
                }) => (
                  <SidebarChannel
                    key={id}
                    id={id}
                    channelName={name}
                    type={type}
                  />
                )
              )}
            </div>
          </div>
        </div>
        <NewChannelModal
          visible={addChannelModalState}
          setVisible={setAddChannelModalState}
          title="Create Channel"
          addChannel={handleAddChannel}
        />
      </div>
      <div className="h-[75px] flex flex-row items-center justify-between px-2 bg-primary rounded-t-2xl mx-2 mt-2">
        <Dropdown>
          <DropdownTrigger>
            <div>
              <User user={user} showTag={true} />
            </div>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownSection title="Status" showDivider>
              <DropdownItem
                onClick={() => {
                  handleChangeStatus("online");
                }}
              >
                Online
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  handleChangeStatus("dnd");
                }}
              >
                Do not disturb
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  handleChangeStatus("away");
                }}
              >
                Away
              </DropdownItem>
              <DropdownItem
                onClick={() => {
                  handleChangeStatus("offline");
                }}
              >
                Offline
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem
                onClick={() => {
                  navigator.clipboard.writeText(user.id);
                }}
              >
                Copy user ID
              </DropdownItem>
            </DropdownSection>
          </DropdownMenu>
        </Dropdown>

        <ServerSettings isOpen={isOpen} onClose={onClose} />

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
