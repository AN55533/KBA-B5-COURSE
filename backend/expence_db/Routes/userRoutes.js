import e, { Router } from "express";
// import { Course } from "./adminRoute.js";
// import { authenticate } from "../Middleware/auth.js";
import { expence } from "../Models/sample.js";

const user = Router();

user.get('/getExpence', async (req, res) => {

    try {
        const key = req.query.description;
        const result = await expence.findOne({ description: key });


        if (result) {
            res.status(200).json({ result })
        }
        else {
            res.status(404).json({ msg: "Expence not found" })
        }
    }
    catch {
        res.status(400).json({ msg: 'Something gone wrong on getting or fetching data' })
    }
})

user.get('/getExpence/:description', async (req, res) => {
    console.log(req.params.description);
    try {

        const key = req.params.description;
        const result = await expence.findOne({ description: key });

        if (result) {
            res.status(200).json({ result })
        }
        else {
            res.status(404).json({ msg: "Expence not found" })
        }
    }
    catch {
        res.status(500).json({ msg: "Internal Server error" })
    }
})



export default user;