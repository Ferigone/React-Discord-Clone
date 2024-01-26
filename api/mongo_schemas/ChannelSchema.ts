import {Schema, model} from "mongoose";
import { ObjectId } from 'mongodb';

const ChannelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: "text",
    },
    nsfw: {
        type: Boolean,
        default: false,
    },
    user_limit: {
        type: Number,
        default: 0,
    },
    server_id: {
        type: ObjectId,
        required: true,
    },
    parent_id: {
        type: ObjectId,
        default: null,
    },
    member_count: {
        type: Number,
        default: 0,
    },
    permissions: {
        type: Array,
        default: [],
    },
    messages: {
        type: Array,
        default: [],
    },
});

export default model("Channels", ChannelSchema);
