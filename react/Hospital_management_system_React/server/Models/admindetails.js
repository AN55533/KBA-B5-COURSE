import { Schema } from "mongoose";
import { model } from "mongoose"
const demo = new Schema({
    firstName: String,
    lastName: String,
    userName: { type: String, required: true, unique: true },
    password: String,
    userRole: { type: String, enum: ['admin', 'user'], required: true }
});
const admindata = model('admindetails', demo)

export default admindata