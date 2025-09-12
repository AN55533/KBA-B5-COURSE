import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import admindata from "../Models/admindetails.js";
import patientdata from "../Models/patientdetails.js";
import doctordata from "../Models/doctordetails.js";
import { authenticate } from "../Middleware/auth.js";
import verifyDoctorToken from "../Middleware/authdoctor.js";
import verifyPatientToken from '../Middleware/authpatient.js'; 


const router = Router();


router.get('/hi', (req, res) => {
    console.log("HI World");
    res.send("Hi World")
})

router.post('/signup', async (req, res) => {
    try {
        const { FirstName, LastName, UserName, Password, UserRole } = req.body;

        if (UserRole === 'admin') {
            const existingAdmin = await admindata.findOne({ userRole: 'admin' });
            if (existingAdmin) {
                return res.status(403).json({ msg: 'Admin already exists. Only one admin allowed.' });
            }
        }
        const User = await admindata.findOne({ UserName });
        if (User) {
            return res.status(400).json({ msg: "Username already exists" });
        }


        const newPassword = await bcrypt.hash(Password, 10);


        const newUser = new admindata({
            firstName: FirstName,
            lastName: LastName,
            userName: UserName,
            password: newPassword,
            userRole: UserRole
        });

        await newUser.save();

        res.status(201).json({ msg: "Successfully created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { UserName, Password } = req.body
  

        const result = await admindata.findOne({ userName: UserName })
        if (!result) {
            res.status(404).json({ msg: 'UserName not registered' })
        }
        const valid = await bcrypt.compare(Password, result.password)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({ UserName, UserRole: result.userRole }, process.env.Secret_key, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('HMToken', token, {
                    httpOnly: true
                })
                res.status(200).json({ msg: 'Succesfully loggedin' })
            }
            else {
                res.status(400).json({ msg: 'Something wrong in token generation' })
            }
        }
    } catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }

})

router.post('/patientsignup', async (req, res) => {
    try {
        const { patientName, email, password } = req.body;

        const User = await patientdata.findOne({ email });
        if (User) {
            return res.status(400).json({ msg: "patientName already exists" });
        }


        const newPassword = await bcrypt.hash(password, 10);


        const newpatient = new patientdata({
            patientName: patientName,
            email: email,
            password: newPassword,
            
        });

        await newpatient.save();

        res.status(201).json({ msg: "Successfully created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});
router.post('/patientlogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const patient = await patientdata.findOne({ email });
        console.log(patient.password);
        console.log(password);
        if (!patient) {
            return res.status(404).json({ msg: 'Email not registered' });
        }

        const isMatch = await bcrypt.compare(password, patient.password);

        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        const token = jwt.sign(
            {   patientName:patient.patientName, patientId: patient._id, email: patient.email },
            process.env.PATIENT_SECRET_KEY,
            { expiresIn: '1h' }
        );
        console.log(token)

        res.cookie('patientHMToken', token, {
            httpOnly: true,
         
        });
       

        res.status(200).json({ msg: 'Successfully logged in', token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Something went wrong during login' });
    }
});


router.post('/doctorlogin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: 'Email and password are required' });
        }

        const doctor = await doctordata.findOne({ Email:email });

        
        if (!doctor) {
            return res.status(404).json({ msg: 'Email not registered' });
        }

        const isMatch = await bcrypt.compare(password, doctor.Password);

        if (!isMatch) {
            return res.status(401).json({ msg: 'Invalid password' });
        }

        const token = jwt.sign(
            { DoctorName: doctor.DoctorName, email: doctor.Email },
            process.env.DOCTOR_SECRET_KEY,
            { expiresIn: '1h' }
        );
        console.log(token)

        res.cookie('doctorHMToken', token, {
            httpOnly: true,

        });


        res.status(200).json({ msg: 'Successfully logged in', token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ msg: 'Something went wrong during login' });
    }
});

router.get('/adminlogout', authenticate, (req, res) => {
    res.clearCookie('HMToken');
    res.status(200).json({ msg: 'Sucessfully Logged out' })
})
router.get('/patientlogout', verifyPatientToken, (req, res) => {
    res.clearCookie('patientHMToken');
    res.status(200).json({ msg: 'Sucessfully Logged out' })
})

router.get('/doctorlogout', verifyDoctorToken, (req, res) => {
    res.clearCookie('doctorHMToken');
    res.status(200).json({ msg: 'Sucessfully Logged out' })
})




export { router };