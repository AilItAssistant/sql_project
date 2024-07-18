import express from "express";
import morgan from "morgan";
import cors from "cors";

import { accommodations } from "./routes/accommodations.routes.mjs";

import { alumnos } from "./routes/alumnos.routes.mjs";

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

app.use("/api/accommodations", accommodations);

app.use("/api/alumnos", alumnos)

export default app;