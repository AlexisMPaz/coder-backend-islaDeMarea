import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true,
    },
    message: { 
        type: String, 
        required: true 
    }
});

const messageModel = model("Messages", messageSchema);

export default messageModel;