import { Schema } from "mongoose";
import { model } from "mongoose"

const demo3 = new Schema({
    Department: { type: String },
    DoctorName: { type: String },
    patientName: { type: String }, 
    date: { type: String, required: true },
    time: { type: String, required: true }
});

const appointmentdata = model('appointmentdetails', demo3)

export default appointmentdata