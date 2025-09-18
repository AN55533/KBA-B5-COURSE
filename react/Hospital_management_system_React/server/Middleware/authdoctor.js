import jwt from 'jsonwebtoken';

const verifyDoctorToken = (req, res, next) => {
    const cookie = req.headers.cookie;
    console.log(cookie);
    if (cookie) {
        const [name, token] = cookie.trim().split('=');
        console.log("Name:", name);
        console.log("Token:", token);
        if (name == "doctorHMToken") {
            const decode = jwt.verify(token, process.env.DOCTOR_SECRET_KEY)
            console.log(decode);
            req.dName = decode.DoctorName;
            console.log(req.dName);
            next();
        } else {
            res.status(401).json({ msg: "Unauthorised access" })
        }
    } else {
        res.status(401).json({ msg: "Cookie not found" })
    }

};

export default verifyDoctorToken;
