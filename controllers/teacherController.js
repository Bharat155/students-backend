import asyncHandler from "express-async-handler";
import Teacher from "../models/teacherModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//@desc Register a teacher
//@route POST /api/teacher/register
//@access public
export const registerTeacher = asyncHandler(async (req, res) =>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const existingTeacher = await Teacher.findOne({ email });

    if(existingTeacher){
        res.status(400);
        throw new Error("Teacher already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
        username, 
        email,
        password: hashedPassword
    });

    if(teacher) {
        res.status(201).json({
            _id: teacher.id,
            email: teacher.email,
        });
    }else{
        res.status(400);
        throw new Error("Teacher data is not Valid");
    }
});

//@desc Login a teacher
//@route POST /api/teacher/login
//@access public
export const loginTeacher = asyncHandler(async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const teacher = await Teacher.findOne({ email });

    //compare hashed password and the password entered by the user
    if(teacher && (await bcrypt.compare(password, teacher.password))){
        const accessToken = jwt.sign(
            {
                user: {
                    username: teacher.username,
                    email: teacher.email,
                    id: teacher.id,
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "15m"
            },
        );

        res.json({accessToken});
    }else{
        res.json(401);
        throw new Error("Email or password is not valid");
    }
});


//@desc Current teacher info
//@route GET /api/teacher/current
export const currentTeacher = asyncHandler(async( req, res ) => {
    res.json(req.user);
});