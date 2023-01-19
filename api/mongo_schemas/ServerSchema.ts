import {Schema, model } from "mongoose";

const ServerSchema = new Schema({
    id: String,
    name: String,
    icon: String,
    owner_id: {
        type: Object,
    },
    created_at: Date,
    channels: {
        type: Array,
    },
    members: {
        type: Array,
    },
    roles: {
        type: Array,
    },
    region: String,
});

export default model("Servers", ServerSchema);