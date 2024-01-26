import React from "react";
import { Link, useParams } from "react-router-dom";
import "./SidebarChannel.css";

import { RiHashtag } from 'react-icons/ri'

function SidebarChannel({ id, channelName }: { id: string, channelName: string }) {
    const params = useParams();

    const checkIfActive = () => {
        if (params.channel_id === id) {
            return "bg-[#393c42] text-white"
        } else {
            return 'text-[gray]';
        }
    }

    return (
        <Link to={`/app/server/${params.server_id}/channel/${id}`} className={`flex flex-row items-center py-1 my-1 rounded-lg hover:bg-[#393c42] hover:text-[white] cursor-pointer ${checkIfActive()}`}>
            <h5 className="flex items-center mb-1"><RiHashtag className="mt-1 mx-2" />{channelName}</h5>
        </Link>
    );
}

export default SidebarChannel;
