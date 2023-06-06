import express from "express";
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  getStudent,
} from "../controllers/studentController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const studentRouter = express.Router();

//get details of all students
//update details of a student
//delete a student's record
//get the record of a student
//post the details of a student
studentRouter.use(validateToken);
studentRouter.route("/").get(getStudents).post(createStudent);

studentRouter
  .route("/:id")
  .get(getStudent)
  .put(updateStudent)
  .delete(deleteStudent);

export default studentRouter;
