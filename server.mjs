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
import { users } from "./routes/users/users.routes.mjs";
import { answers } from "./routes/answers/answers.routes.mjs";
import { photo } from "./routes/photo/photo.routes.mjs";
import { types } from "./routes/questions_type/questions_type.routes.mjs";
import { skills_unions } from "./routes/skills_unions/skills_unions.routes.mjs";
import { cities } from "./routes/cities/cities.routes.mjs";
import { permissions } from "./routes/permissions/permissions.routes.mjs";
import { status } from "./routes/status/status.routes.mjs";

const app = express();

//? MIDDLEWARES

app.use(morgan("dev"));
app.use(express.json({limit: '10mb'}));
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
app.use("/api/skills", skills);

//LEVELS
app.use("/api/levels", levels);

//TEACHERS
app.use("/api/teachers", teachers);

//QUESTIONS
app.use("/api/questions", questions);

//STATEMENTS
app.use("/api/statements", statements);

//CLASSES
app.use("/api/classes", classes);

//STRUCTURE
app.use("/api/blocks", blocks);

//USERS
app.use("/api/users", users);

//ANSWERS
app.use("/api/answers", answers);

//COMPLETE PHOTO
app.use("/api/photo", photo);

//QUESTIONS TYPES
app.use("/api/types", types);

//SKILLS UNIONS
app.use("/api/skills_unions", skills_unions)

//CITIES
app.use("/api/cities", cities)

//STATUS
app.use("/api/status", status)

//PERMISSIONS
app.use("/api/permissions", permissions)

export default app;