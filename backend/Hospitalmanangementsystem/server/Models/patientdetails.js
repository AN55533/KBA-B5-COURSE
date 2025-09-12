import { Schema, model } from "mongoose";

const demo2 = new Schema({
    patientName: { type: String, required: true },
    age: {type: Number},
    gender: { type: String },
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    chronicDiseases: { type: String },
    bloodType: { type: String }
});

const patientdata = model('patientdetails', demo2);

export default patientdata;