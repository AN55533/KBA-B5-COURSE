import { Router } from "express";

import patientdata from "../Models/patientdetails.js";
import appointmentdata from "../Models/appointment.js";
import doctordata from "../Models/doctordetails.js";
import verifyPatientToken from '../Middleware/authpatient.js'; 
import prescriptiondata from "../Models/prescriptiondetails.js";
import doctorSchedule from "../Models/doctorschedule.js";
import billdata from "../Models/billdetails.js";

const patient = Router();

// patient.post('/patientaddinformation', async (req, res) => {
//     try {
//         const { email,age,gender, phoneNumber,address,chronicDiseases,bloodType} = req.body;

//         const patient = await patientdata.findOne({ email });

//         if (!patient) {
//             return res.status(404).json({ msg: 'Patient not found. Please signup first.' });
//         }

       
//         patient.age = age;
//         patient.gender = gender;
//         patient.phoneNumber = phoneNumber;
//         patient.address = address;
//         patient.chronicDiseases = chronicDiseases;
//         patient.bloodType = bloodType;
       

//         await patient.save();

//         res.status(200).json({ msg: 'Patient details updated successfully' });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ msg: 'Something went wrong', error: error.message });
//     }
// });


patient.get('/getDoctors/:Department', async (req, res) => {
    try {
        const { Department } = req.params;

        const doctors = await doctordata.find({ Department: Department }).select("DoctorName Department");
        if (doctors.length === 0) {
            return res.status(404).json({ msg: "No doctors available for this Department" });
        }

        res.status(200).json(doctors);
    } catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

patient.get('/getDoctorSchedule/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;

        const schedule = await doctorSchedule.findOne({ doctorId }).select("availableDays availableTime");
        if (!schedule) {
            return res.status(404).json({ msg: "No schedule found for this doctor" });
        }
        res.status(200).json(schedule);
    } catch (error) {
        console.error("Error fetching doctor schedule:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

patient.post('/patienttakeappointment', verifyPatientToken, async (req, res) => {
    try {
        const { doctorId, date, time } = req.body;
        const patientname = req.pName;
        const foundPatient = await patientdata.findById(req.pId);
        if (!foundPatient) {
            return res.status(404).json({ msg: 'Patient not found' });
        }
        const foundDoctor = await doctordata.findById(doctorId);
        if (!foundDoctor) {
            return res.status(404).json({ msg: 'Doctor not found' });
        }
        const schedule = await doctorSchedule.findOne({ doctorId });
        if (!schedule) {
            return res.status(400).json({ msg: 'Doctor has no schedule set' });
        }
        const appointmentDay = new Date(date).toLocaleString("en-US", { weekday: "long" });
        if (!schedule.availableDays.includes(appointmentDay)) {
            return res.status(400).json({ msg: `Doctor is not available on ${appointmentDay}` });
        }
        const toMinutes = (t) => {
            const [timeStr, modifier] = t.split(" ");
            let [h, m] = timeStr.split(":").map(Number);
            if (modifier === "PM" && h < 12) h += 12;
            if (modifier === "AM" && h === 12) h = 0;
            return h * 60 + m;
        };

        const appointmentMinutes = toMinutes(time);
        const startMinutes = toMinutes(schedule.availableTime.start);
        const endMinutes = toMinutes(schedule.availableTime.end);

        if (appointmentMinutes < startMinutes || appointmentMinutes > endMinutes) {
            return res.status(400).json({ msg: 'Doctor is not available at this time' });
        }
        const sameDateTime = await appointmentdata.findOne({
            patientName: patientname,
            date,
            time
        });

        if (sameDateTime) {
            return res.status(400).json({
                msg: `You already have an appointment on ${date} at ${time}`
            });
        }

  
        const existing = await appointmentdata.findOne({
            patientName: patientname,
            DoctorName: foundDoctor.DoctorName,
            date
        });

        if (existing) {
            existing.time = time;
            await existing.save();
            return res.status(200).json({
                msg: 'Appointment updated successfully',
                appointment: existing
            });
        }
        const doctorAlreadyBooked = await appointmentdata.findOne({
            DoctorName: foundDoctor.DoctorName,
            date,
            time
        });
        if (doctorAlreadyBooked) {
            return res.status(400).json({ msg: 'Doctor is already booked at this time' });
        }

        const newAppointment = new appointmentdata({
            DoctorName: foundDoctor.DoctorName,
            patientName: patientname,
            date,
            time,
            Department: foundDoctor.Department
        });

        await newAppointment.save();
        res.status(201).json({ msg: 'Appointment booked successfully', appointment: newAppointment });

    } catch (error) {
        console.error('Error while booking appointment:', error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
});

patient.get('/getappointment', async (req, res) => {
    try {
        const key = req.query.patientName;
        const result = await appointmentdata.find({ patientName: key });

        if (result.length > 0) {
            res.status(200).json({ result });
        } else {
            res.status(404).json({ msg: "No appointment found for this patient" });
        }
    } catch (error) {
        console.error("Get error:", error);
        res.status(400).json({ msg: 'Something went wrong while fetching data' });
    }
});
patient.put('/updateappointment', async (req, res) => {
    try {
        const { patientName, searchDate, DoctorName, Department, newdate, time } = req.body;

        const result = await appointmentdata.findOne({ patientName, date: searchDate });

        if (result) {
            
            result.DoctorName = DoctorName || result.DoctorName;
            result.Department = Department || result.Department;
            result.date = newdate || result.date; 
            result.time = time || result.time;

            await result.save();

            res.status(200).json({ msg: "Appointment updated successfully", updated: result });
        } else {
            res.status(404).json({ msg: "No appointment found for this patient on the given date" });
        }

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ msg: 'Something went wrong during the update' });
    }
});

patient.delete('/cancelappointment', async (req, res) => {
    try {
        const { date } = req.body;

        const deleted = await appointmentdata.findOneAndDelete({ date });

        if (deleted) {
            res.status(200).json({ msg: 'Appointment deleted successfully' });
        } else {
            res.status(404).json({ msg: 'Appointment not found for the given date' });
        }

    } catch (error) {
        console.error('Delete error:', error);
        res.status(500).json({ msg: 'Something went wrong while deleting the appointment' });
    }
});

patient.get("/getprescriptions", verifyPatientToken, async (req, res) => {
    try {
        const patientName = req.pName; 
        const prescriptions = await prescriptiondata.find({ patientName });

        if (prescriptions.length === 0) {
            return res.status(404).json({ msg: "No prescriptions found" });
        }

        res.status(200).json({ prescriptions });
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

patient.get("/viewBill", verifyPatientToken, async (req, res) => {
    try {
        const bills = await billdata.find({ patientName: req.pName });

        if (bills.length === 0) {
            return res.status(404).json({ msg: "No bills found for this patient" });
        }

        res.status(200).json({ bills });
    } catch (error) {
        console.error("Error fetching bills:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

patient.put("/payBill/:id", verifyPatientToken, async (req, res) => {
    try {
        const { id } = req.params;

        const bill = await billdata.findById(id);
        if (!bill) {
            return res.status(404).json({ msg: "Bill not found" });
        }

        if (bill.patientName !== req.pName) {
            return res.status(403).json({ msg: "Unauthorized: This bill does not belong to you" });
        }

        if (bill.isPaid) {
            return res.status(400).json({ msg: "Bill already paid" });
        }

        bill.isPaid = true;
        bill.status = "Paid"; 
        bill.paymentDate = new Date();
        await bill.save();

        res.status(200).json({ msg: "Payment successful", bill });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
export { patient };