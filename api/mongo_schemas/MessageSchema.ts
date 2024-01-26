import {Schema, model} from "mongoose";
import { ObjectId } from 'mongodb';

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: ObjectId,
        required: true,
    },
    channel_id: {
        type: ObjectId,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

export default model("Messages", MessageSchema);
