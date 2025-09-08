import { Schema } from 'mongoose'
import { model } from 'mongoose'
const demo = new Schema({
    firstname: String,
    lastname: String,
    username: { type: String, required: true, uniue: true },
    password:String,
    userRole: { type: String, enum: ['admin', 'user'], required: true }

})
const sample = ('logindetails', demo);
export default sample;

const expenceSchema = new Schema({
    description: { type: String },
    amount: {type:Number},
    date: {type:Date}
})

const expence = model('expences', expenceSchema)

export { expence };