import express from "express";
import { loginTeacher, registerTeacher, currentTeacher } from "../controllers/teacherController.js";
import { validateToken } from "../middleware/validateTokenHandler.js";

const teacherRouter = express.Router();

teacherRouter.post("/register", registerTeacher);

teacherRouter.post("/login", loginTeacher);

teacherRouter.get("/current", validateToken ,currentTeacher);


export default teacherRouter;