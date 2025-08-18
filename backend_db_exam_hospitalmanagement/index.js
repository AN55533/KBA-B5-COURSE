import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { router } from './Routes/loginRoutes.js'
import { admin } from './Routes/adminRoutes.js'
import { user } from './Routes/patientRoutes.js'

dotenv.config();

const app = express();
app.use(json());

app.use('/', router)
app.use('/', admin)
app.use('/', user)


app.post("/getdata", (req, res) => {
    console.log("Hello World");
    res.send("Hello World");
})

mongoose.connect('mongodb://localhost:27017/hospitl_db').then(() => {
    console.log(" MongoDB connected successfully to hospitl_db");
})
    .catch((error) => {
        console.error(" MongoDB connection failed:", error);
    });
app.listen(process.env.PORT, (req, res) => {
    console.log(` app is listeniong to port  ${process.env.PORT}`);
})

