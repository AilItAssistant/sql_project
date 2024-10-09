import "dotenv/config";
import { pool } from "../../index.mjs"

//?ADD QUESTION
export const addQuestion = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        let question_id;
        try {
            conn = await pool.getConnection();
/**/ 
            if ( req.body.photoQuestion ) {
                console.log("preguntas con foto")
                let photo = await conn.query(`
                    INSERT INTO 
                        photos ( base64_data ) 
                    VALUES ( '${req.body.photoQuestion}' );
                `);
                let id = photo.insertId.toString();
                let questions = await conn.query(`
                    INSERT INTO 
                        questions (
                            content, skill_id, puntuation 
                            level_id, statement_id, photo_id) 
                    VALUES (
                        '${req.body.question}', ${req.body.skill_id}, ${req.body.puntuation},
                        ${req.body.level_id}, ${req.body.statement_id}, ${id}
                        );
                `);
            } else {
                console.log("preguntas sin foto")
                let questions = await conn.query(`
                    INSERT INTO 
                        questions (
                            content, skill_id, puntuation,
                            level_id, statement_id) 
                    VALUES (
                        '${req.body.question}', ${req.body.skill_id}, ${req.body.puntuation},
                        ${req.body.level_id}, ${req.body.statement_id}
                        );
                `);
            };
            console.log("sale de preguntas")
            question_id = questions.insertId.toString();
            if ( req.body.typeAnswers === "photo" ) {
                for(let i = 0; req.body.responses.length > i; i++){

                    let photoAnswer = await conn.query(`
                        INSERT INTO 
                            photos ( base64_data ) 
                        VALUES ( '${req.body.photoId}' );
                    `);
                    let id = photoAnswer.insertId.toString();
                    let responses = await conn.query(`
                        INSERT INTO 
                            answers (
                            question_id, 
                            content, is_correct,
                            letter, photo_id) 
                        VALUES (
                            ${question_id}, '${req.body.responses[i].content}', 
                            ${req.body.responses[i].is_correct}, ${req.body.responses[i].letter}, 
                            ${id}
                            );
                    `);
                };
            } else if ( req.body.typeAnswers === "phrase" ) {
                for(let i = 0; req.body.responses.length > i; i++){
                    let responses = await conn.query(`
                        INSERT INTO 
                            answers (
                            question_id, 
                            content, is_correct,
                            letter) 
                        VALUES (
                            ${question_id}, '${req.body.responses[i].content}', 
                            ${req.body.responses[i].is_correct}, ${req.body.responses[i].letter}
                        );
                    `);
                };
            };
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const getQuestionById = async (req, res) => {
    if ( req.data ) {
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
                if(element.photo_id){element.photo_id = element.photo_id.toString();}
            });
            res.json(question);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};
