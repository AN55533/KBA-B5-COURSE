import jwt from 'jsonwebtoken';

const verifyPatientToken = (req, res, next) => {
    const cookie = req.headers.cookie;
    console.log(cookie);
    if (cookie) {
        const [name, token] = cookie.trim().split('=');
        console.log("Name:", name);
        console.log("Token:", token);
        if (name == "patientHMToken") {
            const decode = jwt.verify(token, process.env.PATIENT_SECRET_KEY)
            console.log(decode);
            req.pId = decode.patientId;
            req.pName = decode.patientName;
            console.log(req.pId);
            console.log(req.pName);
            next();
        } else {
            res.status(401).json({ msg: "Unauthorised access" })
        }
    } else {
        res.status(401).json({ msg: "Cookie not found" })
    }

};

export default verifyPatientToken;
