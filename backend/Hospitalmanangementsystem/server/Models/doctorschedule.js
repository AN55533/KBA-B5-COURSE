import { Schema } from "mongoose";
import { model } from "mongoose";
import mongoose from "mongoose";
const demo5 = new Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true 
    },
    availableDays: {type: [String],required: true,},
    availableTime: { start: { type: String, required: true },
        end: { type: String, required: true }, 
    },
    createdAt: { type: Date,default: Date.now,},
});
const doctorSchedule = model('doctorscheduledetails', demo5)

export default doctorSchedule