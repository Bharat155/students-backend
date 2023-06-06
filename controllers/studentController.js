import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";

// @desc Get all students
// @route GET /api/students
// @access private
export const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({ tId: req.user.id });
  res.status(200).json({
    students,
  });
});

// @desc Get a particular students
// @route GET /api/students/:id
// @access private
export const getStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }
  res.status(200).json({
    student,
  });
});

// @desc Post a particular student details
// @route POST /api/students
// @access private
export const createStudent = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  //check if all the fields that are required are there in the code
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const student = await Student.create({
    tId: req.user.id,
    name,
    email,
    phone,
  });
  res.status(200).json({
    student,
  });
});

// @desc Update a particular student's details
// @route PUT /api/students/:id
// @access private
export const updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  if(req.user.id.toString() !== student.tId.toString()){
    req.status(403);
    throw new Error("Unauthorised");
  }

  const updatedStudent = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json({
    updatedStudent,
  });
});

// @desc Delete a particular student's recors
// @route DELETE /api/students/:id
// @access private
export const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    res.status(404);
    throw new Error("Student not found");
  }

  if(req.user.id.toString() !== student.tId.toString()){
    req.status(403);
    throw new Error("Unauthorised");
  }

  await Student.findByIdAndDelete(req.params.id);

  res.status(200).json({
    student,
  });
});
