import express from "express";
import morgan from "morgan";
import cors from "cors";

import { alumnos } from "./routes/alumnos/alumnos.routes.mjs";
import { exams } from "./routes/exams/exams.routes.mjs";
import { teachers } from "./routes/teachers/teachers.routes.mjs";
import { classes } from "./routes/classes/classes.routes.mjs";
import { questions } from "./routes/questions/questions.routes.mjs";
import { statements } from "./routes/stataments/statements.routes.mjs";
import { levels } from "./routes/level/level.routes.mjs";
import { skills } from "./routes/skill/skill.routes.mjs";
import { blocks } from "./routes/blocks/blocks.routes.mjs";

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

//ALUMNOS
app.use("/api/alumnos", alumnos);

//EXAMS
app.use("/api/exams", exams);

//SKILLS
app.use("/api/skills", skills)

//LEVELS
app.use("/api/levels", levels);

//TEACHERS
app.use("/api/teachers", teachers);

//QUESTIONS
app.use("/api/questions", questions);

//STATEMENTS
app.use("/api/statements", statements)

//CLASSES
app.use("/api/classes", classes);

//STRUCTURE
app.use("/api/blocks", blocks);

//STRUCTURE
//app.use("/api/structure", structure);

//USERS
//app.use("/api/users", users);

//COMPLETE EXAMS
//app.use("/api/completeExams", completeExams);

export default app;