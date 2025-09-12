import express,{json} from 'express';
import dotenv from 'dotenv';
import { router } from './Routes/loginRoute.js';
import { admin } from './Routes/adminRoute.js';
import { patient } from './Routes/patientRoute.js';
import { doctor } from './Routes/doctorRoute.js';
import mongoose from 'mongoose'
dotenv.config();

const app = express();

app.use(json())
app.use('/', router)
app.use('/', admin)
app.use('/', patient)
app.use('/', doctor)

app.post("/getData", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
})

mongoose.connect('mongodb://localhost:27017/Hospiatal_management_system').then(() => {
    console.log(" MongoDB connected successfully to Hospiatal_management_system");
})
    .catch((error) => {
        console.error(" MongoDB connection failed:", error);
    });


app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port  ${process.env.PORT}`)
})