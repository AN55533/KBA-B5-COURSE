import { Schema } from "mongoose";
import { model } from "mongoose"
const demo1 = new Schema({
    DoctorName: { type: String, required: true },
    Gender: { type: String, required: true },
    Age: { type: Number, required: true },
    Department: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true }
    
});
const doctordata = model('doctordetails', demo1)

export default doctordata