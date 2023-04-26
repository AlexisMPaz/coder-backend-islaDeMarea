import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        index: true,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    role:{
        type: String,
        default: "Usuario"
    },
    password:{
        type: String,
        required: true
    },
    idCart: {
        type: Schema.Types.ObjectId,
        ref: "Carts",
        required: true
    }
})

const userModel = model("Users", userSchema);

export default userModel