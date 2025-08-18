import mongoose, { Schema } from 'mongoose';
import { model } from 'mongoose';



const demo1 = new Schema({
    firstName: String,
    lastName: String,
    userName: { type: String},
    password: String,
    userRole: { type: String,  required: true }
});
const sample = model('samp', demo1)

export default sample;

const demo2 = new Schema({
    doctorName: String,
    specialization: String,
   
});
const doctors = model('doctor', demo2)

export { doctors };

const demo3 = new Schema({
    patientName: String,
    age: String,
    gender:String

});
const patients = model('patient', demo3)

export { patients };

const demo4 = new Schema({
    doctorName: String ,
    patientName: String,
    date: String,
    time: String
})
const appointments = model('appointment', demo4)
export { appointments };