import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: Number,
        unique: true,
        index: true,
        required: true,
        default: Date.now,
    },
    purchase_datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const ticketModel = model("Tickets", ticketSchema);

export default ticketModel;