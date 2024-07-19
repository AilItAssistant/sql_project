import express from "express";
import morgan from "morgan";
import cors from "cors";

import { accommodations } from "./routes/accommodations/accommodations.routes.mjs";

import { alumnos } from "./routes/alumnos/alumnos.routes.mjs";

import { examPdf } from "./routes/exams/examPdf.routes.mjs";

import { examsA1 } from "./routes/exams/examsA1.routes.mjs";

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

//EXAMS PDF
app.use("/api/pdf", examPdf);

//EXAMS A1
app.use("/api/examsA1", examsA1);

export default app;