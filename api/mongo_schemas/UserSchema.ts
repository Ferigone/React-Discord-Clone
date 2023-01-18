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
    discriminator: String,
    avatar: String,
    mfa_enabled: Boolean,
    locale: String,
    verified: Boolean,
    flags: Number,
});

export default model("Users", UserSchema);
