import { Router } from "express";
import { authenticate } from "../Middleware/auth.js";
import admincheck from "../Middleware/admin.js";

const admin = Router();
const course = new Map()


admin.post('/addCourse', authenticate, admincheck,(req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
        if (course.get(CourseName)) {
            res.status(400).json({ msg: 'Course already exist' })
        }
        else {
            try {
                course.set(CourseName, { CourseId, CourseType, Description, Price });
                res.status(201).json({ msg: 'Course successfully entered' })
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

admin.put('/updateCourse',authenticate, admincheck, (req, res) => {
    try {
        const { CourseName, CourseId, CourseType, Description, Price } = req.body;
        if (course.get(CourseName)) {
            course.set(CourseName, { CourseId, CourseType, Description, Price });
            res.status(200).json({ msg: "Course details updated succesfully" })
        }
        else {
            res.status(404).json({ msg: "Course not found" })
        }
    }
    catch {
        res.status(500).json({ msg: 'Something gone wrong' })
    }
})

admin.patch('/updateCourse', (req, res) => {
    try {
        const { CourseName, Price } = req.body;
        const result = course.get(CourseName);
        console.log(result);
        if (result) {
            course.set(CourseName, { CourseId: result.CourseId, CourseType: result.CourseType, Description: result.Description, Price })
            res.status(200).json({ msg: "Course Updated" })
        }
        else {
            res.status(404).json({ msg: "Course doesnt exist" })
        }
    }
    catch {
        res.status(500).json({ msg: "Something went wrong" })
    }
})

admin.delete('/deleteCourse', (req, res) => {
    try {
        const { CourseName } = req.body;
        if (course.get(CourseName)) {
            course.delete(CourseName)
            res.status(200).json({ msg: 'Course deleted succesfully' })
        }
        else {
            res.status(404).json({ msg: 'Course not found' })
        }
    }
    catch {
        res.status(500).json({ msg: 'Something went wrong' })
    }
})



export { admin, course };