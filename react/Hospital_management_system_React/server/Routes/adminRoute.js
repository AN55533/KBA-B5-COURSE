import { Router } from "express";
import { authenticate } from "../Middleware/auth.js";
import admincheck from "../Middleware/admin.js";
import doctordata from "../Models/doctordetails.js";
import appointmentdata from "../Models/appointment.js";
import bcrypt from 'bcrypt';
import doctorSchedule from "../Models/doctorschedule.js";
import prescriptiondata from "../Models/prescriptiondetails.js";
import patientdata from "../Models/patientdetails.js";
import billdata from "../Models/billdetails.js";

const admin = Router();


admin.post('/addDoctor', authenticate, admincheck, async(req, res) => {
    try {
        const { DoctorName, Gender, Age, Department, PhoneNumber, Email, Password } = req.body;
        const doctor = await doctordata.findOne({ DoctorName });
        if (doctor) {
            res.status(400).json({ msg: 'doctordetails already exist' })
        }
        else {
            try {

                const newpassword = await bcrypt.hash(Password,10)
                const newdoctor = new doctordata({
                    DoctorName: DoctorName,
                    Gender: Gender,
                    Age: Age,
                    Department: Department,
                    PhoneNumber: PhoneNumber,
                    Email: Email,
                    Password: newpassword
                });

                await newdoctor.save();
                res.status(201).json({ msg: 'Doctor successfully entered' })
            }

            catch(error) {
                console.log(error);
                res.status(400).json({ msg: 'Something went wrong while setting data' })
            }
        }
    }
    catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }

})

admin.get('/viewDoctors', authenticate, admincheck, async (req, res) => {
    try {
        const doctors = await doctordata.find({});
        if (doctors.length === 0) {
            return res.status(404).json({ msg: 'No doctors found' });
        }
        res.status(200).json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});

admin.put('/updateDoctor', authenticate, admincheck, async(req, res) => {
    try {
        const { DoctorName,  PhoneNumber, Email, Password } = req.body;

        

        const updatedDoctor = await doctordata.findOneAndUpdate(
            { DoctorName }, 
            {
                PhoneNumber,
                Email,
                Password,
            }  
        );
        await updatedDoctor.save();
       
        if (updatedDoctor) {
           
            res.status(200).json({ msg: "doctor details updated succesfully" })
        }
        else {
            res.status(404).json({ msg: "doctor details not found" })
        }
    }
    catch {
        res.status(500).json({ msg: 'Something gone wrong' })
    }
})
admin.delete('/deleteDoctor', async (req, res) => {
    try {
        const { DoctorName } = req.body;

        const doctor = await doctordata.findOne({ DoctorName });

        if (doctor) {
            await doctordata.findOneAndDelete({ DoctorName });
            res.status(200).json({ msg: 'Doctor deleted successfully' });
        } else {
            res.status(404).json({ msg: 'Doctor not found' });
        }
    } catch (error) {
        console.error("Error deleting doctor:", error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
});

admin.post('/addSchedule', authenticate, admincheck, async (req, res) => {
    try {
        const { doctorId, availableDays, availableTime } = req.body;


        const doctorExists = await doctordata.findById(doctorId);
        if (!doctorExists) {
            return res.status(404).json({ msg: "Doctor not found" });
        }
        const existingSchedule = await doctorSchedule.findOne({ doctorId });
        if (existingSchedule) {
            return res.status(400).json({ msg: "Schedule already exists for this doctor" });
        }
        const uniqueDays = [...new Set(availableDays)];
        const schedule = new doctorSchedule({
            doctorId,
            availableDays: uniqueDays,
            availableTime
        });

        await schedule.save();
        res.status(201).json({ msg: "Doctor schedule added successfully", schedule });
    } catch (error) {
        console.error("Error adding schedule:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

admin.get('/getSchedule/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const schedule = await doctorSchedule.findOne({ doctorId }).select("availableDays availableTime createdAt doctorId"); 
        if (!schedule) {
            return res.status(404).json({ msg: "Schedule not found for this doctor" });
        }

        const doctor = await doctordata.findById(doctorId).select("DoctorName Department");
        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }

        res.status(200).json({
            doctorId: schedule.doctorId,
            DoctorName: doctor.DoctorName,
            Department: doctor.Department,
            availableDays: schedule.availableDays,
            availableTime: schedule.availableTime,
            createdAt: schedule.createdAt
        });
    } catch (error) {
        console.error("Error fetching schedule:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

admin.put('/updateSchedule/:doctorId', async (req, res) => {
    try {
        const { doctorId } = req.params;
        const { availableDays, availableTime } = req.body;
        const doctor = await doctordata.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ msg: "Doctor not found" });
        }
        const updatedSchedule = await doctorSchedule.findOneAndUpdate(
            { doctorId },
            { availableDays, availableTime },
            { new: true}
        );

        if (!updatedSchedule) {
            return res.status(404).json({ msg: "Schedule not found for this doctor" });
        }

        res.status(200).json({
            msg: "Schedule updated successfully",
            schedule: updatedSchedule
        });
    } catch (error) {
        console.error("Error updating schedule:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

admin.put("/updatePatient/:id", authenticate, admincheck, async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; 
        const patient = await patientdata.findById(id);
        if (!patient) {
            return res.status(404).json({ msg: "Patient not found" });
        }

        const appointment = await appointmentdata.findOne({ patientName: patient.patientName });
        if (!appointment) {
            return res.status(403).json({ msg: "Patient has no appointment, cannot update details" });
        }
        const updatedPatient = await patientdata.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );

        res.status(200).json({ msg: "Patient details updated successfully", patient: updatedPatient });
    } catch (error) {
        console.error("Error updating patient:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

admin.get('/viewAppointments', authenticate, admincheck, async (req, res) => {
    try {
        const appointments = await appointmentdata.find({});
        if (appointments.length === 0) {
            return res.status(404).json({ msg: 'No appointments found' });
        }
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Something went wrong' });
    }
});

admin.post("/createBill", authenticate, admincheck, async (req, res) => {
    try {
        const { prescriptionId, consultationFee} = req.body;

        const prescription = await prescriptiondata.findById(prescriptionId);
        if (!prescription) {
            return res.status(404).json({ msg: "Prescription not found" });
        }
        let medicineCharges = 0;
        const pricedMeds = prescription.medications.map(med => {
            const price = 50; 
            medicineCharges += price;
            return { ...med.toObject(), price };
        });

        const totalAmount = consultationFee + medicineCharges ;
        const newBill = new billdata({
            patientName: prescription.patientName,
            DoctorName: prescription.DoctorName,
            diagnosis: prescription.diagnosis,
            medications: pricedMeds,
            consultationFee,
            medicineCharges,
            totalAmount
        });

        await newBill.save();
        res.status(201).json({ msg: "Bill created successfully", bill: newBill });
    } catch (error) {
        console.error("Error creating bill:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});
export { admin };