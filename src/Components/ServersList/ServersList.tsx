import React, { useState, useRef, useEffect } from "react";
import { SiDiscord } from "react-icons/si";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdCompass } from "react-icons/io";
import { RiCameraFill } from "react-icons/ri";

import { Tooltip } from "@material-ui/core";

import db, { auth } from "../../utils/firebase";

import { Transition } from "@headlessui/react";

function ServersList() {
  const [modalState, setModalState] = useState<boolean>(false);

  const fileInput = useRef<HTMLInputElement | any>(null);

  const [serverName, setServerName] = useState<string>("");

  const [serverImage, setServerImage] = useState(null);

  const [servers, setServers] = useState([]);

  useEffect(() => {
    db.collection("servers").onSnapshot((snapshot: any) => {
      setServers(
        snapshot.docs.map((doc: any) => ({
          id: doc.id,
          server: doc.data(),
        }))
      );
      console.log(servers);
    });
  }, []);

  const handleOutsideCLick = (e: any) => {
    if (e.target !== e.currentTarget) return;

    setModalState(false);
    setServerImage(null);
  };

  const handleAddServer = () => {
    if (serverName?.length < 3) return;

    db.collection("servers").add({
      serverName: serverName,

    });
    setModalState(false);
    setServerImage(null);
  };

  return (
    <div className="w-[72px] min-w-[72px] bg-[#202225] flex flex-col items-center py-3">
      <div className="mb-2 bg-[#40444B] group hover:bg-[#5865F2] min-h-[48px] min-w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
        <SiDiscord className="fill-[#DCDDDE] group-hover:fill-white h-7 w-7 duration-100" />
      </div>
      <div className="bg-[#2D2F32] h-[2px] w-[30%] mb-2" />

    <div className="block overflow-auto no-scrollbar">
      {servers.map((server: any) => (
        <Tooltip
        title={
          <React.Fragment>
              <span className="text-[15px] font-bold h-5">{server.server.serverName}</span>
            </React.Fragment>
          }
          placement="right"
          arrow
          >
          <div className="mb-2 bg-[#40444B] group hover:bg-[#5865F2] h-[48px] w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
            <span className="text-white text-[20px]">
              {server.server.serverName.charAt(0).toUpperCase()}
            </span>
          </div>
        </Tooltip>
      ))}
      </div>

      <div
        onClick={() => {
          setModalState(true);
        }}
        className="my-2 bg-[#40444B] group hover:bg-[#3BA55D] min-h-[48px] min-w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer"
      >
        <AiOutlinePlus className="fill-[#3BA55D] group-hover:fill-white h-5 w-5 duration-100" />
      </div>
      <div className="mb-2 bg-[#40444B] group hover:bg-[#3BA55D] min-h-[48px] min-w-[48px] flex items-center justify-center rounded-3xl hover:rounded-2xl duration-100 cursor-pointer">
        <IoMdCompass className="fill-[#3BA55D] group-hover:fill-white h-5 w-5 duration-100" />
      </div>

      <Transition
        show={modalState}
        enter="transition-opacity duration-75"
        enterFrom="opacity-50"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveTo="opacity-0"
        className="z-50"
      >
        <div
          className="absolute w-full h-screen z-50 top-0 left-0 bg-[rgba(0,0,0,0.8)] flex justify-center items-center ease-in"
          onClick={(el: any) => {
            handleOutsideCLick(el);
          }}
        >
          <div className="bg-white rounded-lg w-96 p-3 flex flex-col items-center">
            <h2 className="text-2xl font-bold">Add server</h2>
            <p className="text-center text-[#696F77]">
              Personalize your name and icon. You can change it anytime you
              want.
            </p>
            <div
              className="relative h-[75px] w-[75px] my-5 flex justify-center items-center cursor-pointer"
              onClick={() => {
                fileInput.current.click();
              }}
            >
              <div className="w-full h-full flex justify-center items-center overflow-hidden flex-col border-[#515862] border-[1px] border-dashed rounded-full">
                {serverImage ? (
                  <img src={URL.createObjectURL(serverImage)} />
                ) : (
                  <>
                    <RiCameraFill className="fill-[#4F5660] h-[20px] w-[20px]" />
                    <span className="text-[#4F5660] font-bold text-[12px]">
                      UPLOAD
                    </span>
                  </>
                )}
              </div>
              <div className="absolute right-[-2.5px] top-[-2.5px] bg-[#5865F2] p-1 rounded-full border-[2px] border-white">
                <AiOutlinePlus className="fill-white" />
              </div>
            </div>

            <input
              className="bg-[#FBFBFC] border-solid border-[1px] border-[#B9BBBE] w-full h-10 rounded-[3px] my-2 px-2"
              placeholder="Server name"
              type="text"
              onChange={(el) => {
                setServerName(el.target.value);
              }}
            />
            <button
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white w-full my-2 h-10 rounded-lg"
              onClick={() => {
                handleAddServer();
              }}
            >
              Create
            </button>
          </div>
          <input
            type="file"
            ref={fileInput}
            onChange={(el: any) => {
              setServerImage(el.target.files[0]);
            }}
            className="hidden"
            name="serverIcon"
            accept="image/gif, image/jpeg, image/png"
          />
        </div>
      </Transition>
    </div>
  );
}

export default ServersList;
