import "dotenv/config";
import { pool } from "../../index.mjs"

//?ADD QUESTION
export const addQuestion = async (req, res) => {
    let conn;
    let new_statement_id;
    try {
        conn = await pool.getConnection();
        let questions = await conn.query(`
            INSERT INTO 
                questions (
                    content, 
                    skill_id, 
                    level_id, 
                    statement_id) 
            VALUES (
                '${req.body.question}', 
                ${req.body.skill_id}, 
                ${req.body.level_id}, 
                ${req.body.statement_id});
        `);
        new_statement_id = questions.insertId.toString();
        for(let i = 0; req.body.responses.length > i; i++){
            let responses = await conn.query(`
                INSERT INTO 
                    answers (
                    question_id, 
                    content, 
                    is_correct) 
                VALUES (
                    ${new_statement_id}, 
                    '${req.body.responses[i].content}', 
                    ${req.body.responses[i].is_correct});
            `);
        };
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    };
};

export const getQuestionById = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let question = await conn.query(`
            SELECT
                q.*,
            GROUP_CONCAT(
                a.id 
                ORDER BY 
                a.id)
                AS 
                answers_ids
            FROM
                questions q
            LEFT JOIN
                answers a 
            ON 
                q.id = a.question_id
            WHERE
                q.id = ${req.body.id}
            GROUP BY
                q.id;
        `);
        question.forEach((element) => {
            element.id = element.id.toString();
            if(element.statement_id){element.statement_id = element.statement_id.toString();}
            if(element.block_id){element.block_id = element.block_id.toString();}
            if(element.skill_id){element.skill_id = element.skill_id.toString();}
            if(element.level_id){element.level_id = element.level_id.toString();}
        });
        res.json(question);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    };
};
