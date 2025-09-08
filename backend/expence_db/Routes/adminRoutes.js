import { Router } from "express";
// import { authenticate } from "../Middleware/auth.js";
// import admincheck from "../Middleware/admin.js";
import { expence } from "../Models/sample.js"
// import upload from "../Middleware/upload.js"
const admin = Router();

admin.post('/addexpence',  async (req, res) => {
    try {
        const { description ,amount,date} = req.body;
        if (await expence.findOne({ date: date })) {
            res.status(400).json({ msg: 'expence already exist' })
        }
        else {

            try {
           
                const newExpence = new expence({
                    description: description,
                    amount: amount,
                    date: date,
                    
                })
                await newExpence.save();
                res.status(201).json({ msg: 'Expence successfully entered' })
            }

            catch {
                res.status(400).json({ msg: 'Something went wrong while setting data' })
            }
        }
    }
    catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }

})

admin.put('/updateexpence', async (req, res) => {
    try {
        const { description, amount, date } = req.body;
        const result = await expence.findOne({ date: date })
        if (result) {
            result.description = description;
            result.amount = amount;
            result.date = date;
            
            console.log(result);
            await result.save();
            res.status(200).json({ msg: "expence details updated succesfully" })
        }
        else {
            res.status(404).json({ msg: "ecpence not found" })
        }
    }
    catch {
        res.status(500).json({ msg: 'Something gone wrong' })
    }
})

admin.patch('/updateexpence', async (req, res) => {
    try {
        const { description } = req.body;
        const result = await expence.findOne({ description: description });
        console.log(result);
        if (result) {
            result.amount = amount;
            await result.save();
            res.status(200).json({ msg: "expence details Updated" })
        }
        else {
            res.status(404).json({ msg: "Expence doesn't exist" })
        }
    }
    catch {
        res.status(500).json({ msg: "Something went wrong" })
    }
})

admin.delete('/deleteExpence', async (req, res) => {
    try {
        const { description } = req.body;
        if (await expence.findOne({ description: description })) {
            await expence.findOneAndDelete({ description: description })
            res.status(200).json({ msg: 'expence deleted succesfully' })
        }
        else {
            res.status(404).json({ msg: 'expence not found' })
        }
    }
    catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }
})

export { admin };