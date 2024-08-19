import express from "express";
import morgan from "morgan";
import cors from "cors";

import { accommodations } from "./routes/accommodations/accommodations.routes.mjs";
import { alumnos } from "./routes/alumnos/alumnos.routes.mjs";
import { exams } from "./routes/exams/exams.routes.mjs";
import { teachers } from "./routes/teachers/teachers.routes.mjs";
import { classes } from "./routes/classes/classes.routes.mjs";

const app = express();

//? MIDDLEWARES

app.use(morgan("dev"));
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:4200",
    })
);

//? ROUTES

//ACOMODATIONS
app.use("/api/accommodations", accommodations);

//ALUMNOS
app.use("/api/alumnos", alumnos);

//EXAMS
app.use("/api/exams", exams);

//STRUCTURE
//app.use("/api/structure", structure);

//STUDENTS
//app.use("/api/students", students);

//TEACHERS
app.use("/api/teachers", teachers);

//USERS
//app.use("/api/users", users);

//QUESTIONS
//app.use("/api/questions", questions);

//CLASSES
app.use("/api/classes", classes);

//COMPLETE EXAMS
//app.use("/api/completeExams", completeExams);

export default app;