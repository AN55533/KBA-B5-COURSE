import { Router } from 'express'

const router = Router();

router.get('/hi', (req, res) => {
    console.log('hi');
})

router.post('/signup', async(req, res) => {
    const { FirstName, LastName, UserName, Password, UserRole } = req.body;
    console.log(FirstName);
    try {
        const newpassword = await bcrypt.hash(Password, 10);
        console.log(newpassword);
        const result = await sample.findone({ username: UserName })
        console.log(result);
        if (result) {
            res.status(400).json({msg:'Username already exit'})
        } else {
            const newUser = new sample({
                firstName: FirstName,
                lastName: LastName,
                userName: UserName,
                password: newPassword,
                userRole: UserRole
            });
            // Save user to MongoDB
            console.log(newUser)
            await newUser.save();
            console.log(newUser)
            res.status(201).send("Signed-up successfully")
        }

    } catch {
        res.status(404).json({ msg: "Something went wrong on bcrypt" })
}

})

router.post('/login', async(req, res) => {
    try {
        const { UserName, Password } = req.body
        //const result = user.get(UserName)
        const result = await sample.findOne({ userName: UserName })
        if (!result) {
            res.status(404).json({ msg: 'UserName not registered' })
        }
        const valid = await bcrypt.compare(Password, result.password)
        console.log(valid);

        if (valid) {
            const token = jwt.sign({ UserName, UserRole: result.userRole }, process.env.SECRET_KEY, { expiresIn: '1h' })
            console.log(token);
            if (token) {
                res.cookie('authToken', token, {
                    httpOnly: true
                })
                res.status(200).json({ msg: 'Succesfully loggedin' })
            }
            else {
                res.status(400).json({ msg: 'Something wrong in token generation' })
            }
        }
    } catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }

})
export {router}