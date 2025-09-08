import express, { json } from 'express';
import dotenv from 'dotenv'
import { router } from './Routes/loginRoutes.js';
import { admin } from './Routes/adminRoutes.js';
import mongoose from 'mongoose';
dotenv.config();
const app = express();

app.use(json())
app.use('/', router)
app.use('/', admin)
app.get('/', (req, res) => {
    console.log('hello world');
    res.send('hello world')
})


mongoose.connect('mongodb://localhost:27017/Expence_5').then(() => {
    console.log(" MongoDB connected successfully to Expence");
})
    .catch((error) => {
        console.error(" MongoDB connection failed:", error);
    });
app.listen(process.env.PORT, () => {
    console.log(`Server is listening to port  ${process.env.PORT}`)
})