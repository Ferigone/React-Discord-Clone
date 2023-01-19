import {Schema, model} from "mongoose";

const ChannelSchema = new Schema({
    id: String,
    name: String,
    type: String,
    nsfw: Boolean,
    user_limit: Number,
    parent_id: String,
    member_count: Number,
    permissions: {
        type: Array,
    },
    messages: {
        type: Array,
    },
});

export default model("Channels", ChannelSchema);
