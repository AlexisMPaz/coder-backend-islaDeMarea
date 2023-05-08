import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  products: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
    default: []
  },
  total: {
    type: Number,
    required: true,
    default: 0
  }
});

const cartModel = model("Carts", cartSchema);

export default cartModel