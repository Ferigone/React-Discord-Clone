import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    id: String,
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: {
        type: Array,
    },
    permissions: {
        type: Array,
        default: ["CREATE_SERVER", "CREATE_CHANNEL"],
    },
    discriminator: String,
    avatar: String,
    mfa_enabled: Boolean,
    locale: String,
    status: String,
    verified: {
        type: Boolean,
        default: false,
    },
    flags: Number,
});

export default model("Users", UserSchema);
