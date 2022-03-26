import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../store/reducers/appSlice";
import "./SidebarChannel.css";

import {RiHashtag} from 'react-icons/ri'

function SidebarChannel({ id, channelName }: {id: string, channelName: string}) {
    const dispatch = useDispatch();
    return (
        <div className="flex flex-row items-center text-[gray] py-1 mx-2 rounded-lg hover:bg-[#393c42] hover:text-[white] cursor-pointer"
            onClick={() =>
                dispatch(
                    setChannelInfo({
                        channelId: id,
                        channelName: channelName,
                    })
                )
            }
        >
            <h5 className="flex items-center mb-1"><RiHashtag className="mt-1 mx-2" />{channelName}</h5>
        </div>
    );
}

export default SidebarChannel;
