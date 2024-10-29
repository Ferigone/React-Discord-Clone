import SidebarChannel from "@organisms/SidebarChannel/SidebarChannel";
import React from "react";
import { createSwapy } from "swapy";

const ChannelList = ({ channels }) => {
  React.useEffect(() => {
    const container = document.querySelector(".swapy-container");
    const swapy = createSwapy(container, {
      swapMode: "hover",
      animation: "dynamic",
    });

    swapy.onSwap(({ data }) => {
      console.log("swap", data);
      localStorage.setItem("slotItem", JSON.stringify(data.object));
    });

    swapy.onSwapEnd(({ data, hasChanged }) => {
      console.log(hasChanged);
      console.log("end", data);
    });

    swapy.onSwapStart(() => {
      console.log("start");
    });

    return () => {
      swapy.destroy();
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto mt-4">
      <div className="px-2 overflow-y-auto overflow-x-hidden flex flex-col-reverse flex-grow scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
        <div className="swapy-container h-full">
          {channels?.map(
            ({
              id,
              name,
              type,
            }: {
              id: string;
              name: string;
              type: string;
            }) => (
              <div key={id} data-swapy-slot={id}>
                <div data-swapy-item={name}>
                  <SidebarChannel
                    key={id}
                    id={id}
                    channelName={name}
                    type={type}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
