import jwt from 'jsonwebtoken'


function authenticate(req, res, next) {
    const cookie = req.headers.cookie;
    console.log(cookie);
    if (cookie) {
        const [name, token] = cookie.trim().split('=');
        console.log("Name:", name);
        console.log("Token:", token);
        if (name == "authToken") {
            const decode=jwt.verify(token,process.env.Secret_key)
            console.log(decode);
            req.name = decode.UserName;
            req.role = decode.UserRole;
            next();
        } else {
            res.status(401).json({msg:"Unauthorised access"})
        }
    } else {
        res.status(401).json({ msg: "Cookie not found" })
    }
    
}
export {authenticate}