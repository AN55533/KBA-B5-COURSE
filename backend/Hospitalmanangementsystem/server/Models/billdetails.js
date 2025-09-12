import { Schema, model } from "mongoose";

const demo6 = new Schema({
    patientName: { type: String, required: true },
    DoctorName: { type: String, required: true },
    diagnosis: { type: String },
    medications: [
        {
            medicineName: String,
            qtyTime: String,
            action: String,
            price: Number 
        }
    ],
    consultationFee: { type: Number, required: true },
    medicineCharges: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
    date: { type: Date, default: Date.now }
});


const billdata = model('billdetails', demo6);

export default billdata;