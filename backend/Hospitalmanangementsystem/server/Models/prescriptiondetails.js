import { Schema } from "mongoose";
import { model } from "mongoose"


const medical = new Schema({
    medicineName: String,
    qtyTime: String,
    action: String
});


const demo3 = new Schema({
    patientName: { type: String, required: true },
    DoctorName: { type: String, required: true },
    diagnosis: { type: String, required: true },
    medications: [medical],
    date: { type: Date, default: Date.now }
});
const prescriptiondata = model('prescriptiondetails', demo3)

export default prescriptiondata