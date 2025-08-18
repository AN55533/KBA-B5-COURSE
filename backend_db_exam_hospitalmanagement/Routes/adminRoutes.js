import { Router } from 'express'
import { authenticate } from "../middleware/auth.js";
import admincheck from "../middleware/admin.js";
import { doctors } from '../models/sample.js'
import { patients } from '../models/sample.js'
import { appointments } from '../models/sample.js'



const admin = Router();
admin.get('/', (req, res) => {
    console.log("hello world");
    res.send("hello world")
})

admin.post('/adddoctor',async(req, res) => {
    const { doctorName, specialization } = req.body;
    console.log(doctorName);

    if (await doctors.findOne({ doctorName: doctorName })) {
        res.status(400).json({ msg: 'doctor already exist' })
    } else {
        try {
            const newdoctor = new doctors({
                doctorName: doctorName,
                specialization: specialization,
             
            })
            await newdoctor.save();
            res.status(201).json({ msg: 'doctor details successfully entered' })
        
        } catch {
            res.status(400).json({ msg: 'error' })
        }
    }


})


admin.post('/addpatient', async (req, res) => {
    const { patientName, age,gender } = req.body;
    console.log(patientName);

    if (await patients.findOne({ patientName: patientName })) {
        res.status(400).json({ msg: 'patient  details already exist' })
    } else {
        try {
            const newpatient = new patients({
                patientName: patientName,
                age: age,
                gender: gender

            })
            await newpatient.save();
            res.status(201).json({ msg: 'patient details successfully entered' })

        } catch {
            res.status(400).json({ msg: 'error' })
        }
    }


})


admin.post('/addappointment', async (req, res) => {
    const { doctorName, patientName, date, time } = req.body;
   
    console.log(doctorName);
    console.log(patientName);

    if (await appointments.findOne({ patientName: patientName })) {
        res.status(400).json({ msg: 'patient  details already exist' })
    } else {
        try {
          
            const newappointment = new appointments({
                doctorName,
                patientName,
                date,
                time

            })
            await newappointment.save();
            res.status(201).json({ msg: 'appointment details successfully entered' })

        } catch {
            res.status(400).json({ msg: 'error' })
        }
    }


})

admin.get('/getappointment', async (req, res) => {
    console.log(req.params.doctorName);
    try {

        const key = req.params.doctorName;
        const result = await appointments.findOne({ doctorName: key });

        if (result) {
            res.status(200).json({ result })
        }
        else {
            res.status(404).json({ msg: "appointment not found" })
        }
    }
    catch {
        res.status(500).json({ msg: "Internal Server error" })
    }
})

admin.put('/updateappointment', async (req, res) => {
    try {
        const { doctorName, patientName, date, time } = req.body;
        const result = await appointments.findOne({ patientName: patientName })
        if (result) {
            result.doctorName = doctorName;
            result.date = date;
            result.time = time
            console.log(result);
            await result.save();
            res.status(200).json({ msg: "appointments details updated succesfully" })
        }
        else {
            res.status(404).json({ msg: "appointments not found" })
        }
    }
    catch {
        res.status(500).json({ msg: 'Something gone wrong' })
    }
})

admin.delete('/deleteAppointment', async (req, res) => {
    try {
        const { patientName } = req.body;
        if (await appointments.findOne({ patientName: patientName })) {
            await appointments.findOneAndDelete({ patientName: patientName })
            res.status(200).json({ msg: 'appointmet deleted succesfully' })
        }
        else {
            res.status(404).json({ msg: 'appointmet not found' })
        }
    }
    catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }
})


export { admin }
