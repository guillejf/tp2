import { Schema, model } from "mongoose";
/* 
first_name:String,
last_name:String,
email:String (único)
age:Number,
password:String(Hash)
cart:Id con referencia a Carts
role:String(default:’user’)
 */

const schema = new Schema({
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: false, max: 100 },
  firstName: { type: String, required: false, max: 100 },
  rol: { type: String, default: "user", required: true, max: 100 },
  lastName: { type: String, required: false, max: 100 },
  age: { type: Number, required: false },
  cart: { type: String, required: false },
});

export const UserModel = model("users", schema);
