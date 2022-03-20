import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../store/reducers/appSlice";
import "./SidebarChannel.css";
import TagRoundedIcon from '@mui/icons-material/TagRounded';

function SidebarChannel({ id, channelName }) {
    const dispatch = useDispatch();
    return (
        <div className="sidebarChannel"
            onClick={() =>
                dispatch(
                    setChannelInfo({
                        channelId: id,
                        channelName: channelName,
                    })
                )
            }
        >
            <h5><TagRoundedIcon className="sidebarChannel__hash" />{channelName}</h5>
        </div>
    );
}

export default SidebarChannel;
