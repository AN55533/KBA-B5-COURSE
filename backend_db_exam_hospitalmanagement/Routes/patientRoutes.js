
import { Router } from 'express'
import { appointments } from '../models/sample.js'

const user = Router();

user.get('/', (req, res) => {
    console.log("hello world");
    res.send("hello world")
})

user.get('/getappointment/:doctorName',  async (req, res) => {
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


export { user }