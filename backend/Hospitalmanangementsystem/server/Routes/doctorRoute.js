import { Router } from "express";
import prescriptiondata from "../Models/prescriptiondetails.js";
import verifyDoctorToken from "../Middleware/authdoctor.js";
import appointmentdata from "../Models/appointment.js";



const doctor = Router();

doctor.get('/viewallAppointments', verifyDoctorToken, async (req, res) => {
    const DoctorName = req.dName; 
    console.log("Logged in Doctor:", DoctorName);

    try {
        const appointments = await appointmentdata.find({ DoctorName }); 

        if (appointments.length === 0) {
            return res.status(404).json({msg: 'No appointments found for this doctor' });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
});


doctor.post("/addprescription", verifyDoctorToken, async (req, res) => {
    try {
        const { patientName, diagnosis, medications, appointmentId } = req.body;

        const appointment = await appointmentdata.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ msg: "Appointment not found" });
        }

        if (appointment.DoctorName !== req.dName) {
            return res.status(403).json({ msg: "Unauthorized: You can only prescribe for your own patients" });
        }
        const prescription = new prescriptiondata({
            patientName,
            DoctorName: req.dName,
            diagnosis,
            medications
        });

        await prescription.save();

        res.status(201).json({ msg: "Prescription added successfully", prescription });
    } catch (error) {
        console.error("Error adding prescription:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

doctor.get("/myprescriptions", verifyDoctorToken, async (req, res) => {
    try {
        const doctorName = req.dName;
        const prescriptions = await prescriptiondata.find({ DoctorName: doctorName });

        if (prescriptions.length === 0) {
            return res.status(404).json({ msg: "No prescriptions found for this doctor" });
        }

        res.status(200).json({ prescriptions });
    } catch (error) {
        console.error("Error fetching prescriptions:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
export { doctor };