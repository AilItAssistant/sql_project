import { Router } from "express";

// import {
//     getQuestions,
// } from "../../controllers/questions/questions.controller.mjs";

export const questions = Router();


/*
Paso 1: Insertar la Pregunta

INSERT INTO questions (content, skill_id, level_id, difficulty, statement_id) VALUES

('¿Cuál es la capital de Francia?', 1, 1, 'Fácil', 1)

RETURNING id;

Se envia primero la pregunta y luego se envia las respuestas con el id que retorna el cresar la pregunta. enviar bloques al front

INSERT INTO answers (question_id, content, is_correct) VALUES

(101, 'París', true),

(101, 'Londres', false),

(101, 'Berlín', false),

(101, 'Madrid', false);

*/