import "dotenv/config";
import { pool } from "../../index.mjs"

//?ADD QUESTION

export const addQuestion = async (req, res) => {
    let conn;
    let new_statement_id;
    try {
        conn = await pool.getConnection();
        let questions = await conn.query(`INSERT INTO questions (content, skill_id, level_id, difficulty, statement_id) VALUES ('${req.body.question}', ${req.body.skill_id}, ${req.body.level_id}, 'Fácil', ${req.body.statement_id});`);
        new_statement_id = questions.insertId.toString();
        for(let i = 0; req.body.responses.length > i; i++){
            let responses = await conn.query(`INSERT INTO answers (question_id, content, is_correct) VALUES (${new_statement_id}, '${req.body.responses[i].content}', ${req.body.responses[i].is_correct});`);
        }

        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};