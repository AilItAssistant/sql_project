import "dotenv/config";
import { pool } from "../../index.mjs"

//?ADD QUESTION
export const addQuestion = async (req, res) => {
    if ( req.data ) {
        let conn;
        let question_id;
        try {
            conn = await pool.getConnection();
            if ( req.body.photoQuestion ) {
                let photo = await conn.query(`
                    INSERT INTO 
                        photos ( base64_data ) 
                    VALUES ( '${req.body.photoQuestion}' );
                `);
                let id = photo.insertId.toString();
                if( req.body.statement_id ){
                    let questions = await conn.query(`
                        INSERT INTO 
                            questions (
                                content, skill_id, puntuation, level_id, statement_id, photo_id, block_id) 
                        VALUES (
                            '${req.body.question}', ${req.body.skill_id}, ${req.body.puntuation}, ${req.body.level_id}, ${req.body.statement_id}, ${id}, ${req.body.block});
                    `);
                    question_id = questions.insertId.toString();
                } else {
                    let questions = await conn.query(`
                        INSERT INTO 
                            questions (
                                content, skill_id, puntuation, level_id, photo_id, block_id) 
                        VALUES (
                            '${req.body.question}', ${req.body.skill_id}, ${req.body.puntuation}, ${req.body.level_id}, ${id}, ${req.body.block});
                    `);
                    question_id = questions.insertId.toString();
                };
            } else {
                if( req.body.statement_id ){
                    let questions = await conn.query(`
                        INSERT INTO 
                            questions (
                                content, skill_id, puntuation, level_id, statement_id, block_id) 
                        VALUES (
                            '${req.body.question}', ${req.body.skill_id}, ${req.body.puntuation}, ${req.body.level_id}, ${req.body.statement_id}, ${req.body.block});
                    `);
                    question_id = questions.insertId.toString();
                } else {
                    let questions = await conn.query(`
                        INSERT INTO 
                            questions (
                                content, skill_id, puntuation, level_id, block_id) 
                        VALUES (
                            '${req.body.question}', ${req.body.skill_id}, ${req.body.puntuation}, ${req.body.level_id}, ${req.body.block});
                    `);
                    question_id = questions.insertId.toString();
                };
                };
            if ( req.body.typeAnswers === "photo" ) {
                for(let i = 0; req.body.responses.length > i; i++){
                    let photoAnswer = await conn.query(`
                        INSERT INTO 
                            photos ( base64_data ) 
                        VALUES ( '${req.body.responses[i].photo}' );
                    `);
                    let id = photoAnswer.insertId.toString();
                    let responses = await conn.query(`
                        INSERT INTO 
                            answers ( question_id, content, is_correct, letter, photo_id) 
                        VALUES (
                            ${question_id}, '${req.body.responses[i].content}', ${req.body.responses[i].is_correct}, '${req.body.responses[i].letter}', ${id});
                    `);
                };
            } else if ( req.body.typeAnswers === "phrase" ) {
                for(let i = 0; req.body.responses.length > i; i++){
                    let responses = await conn.query(`
                        INSERT INTO 
                            answers (question_id, content, is_correct, letter) 
                        VALUES (
                            ${question_id}, '${req.body.responses[i].content}', ${req.body.responses[i].is_correct}, '${req.body.responses[i].letter}');
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
                GROUP_CONCAT( a.id ORDER BY a.id )
                    AS 
                    answers_ids,
                    p.base64_data AS photo_base64
                FROM
                    questions q
                LEFT JOIN
                    answers a ON q.id = a.question_id
                LEFT JOIN
                    photos p ON q.photo_id = p.id
                WHERE
                    q.id = ${req.body.id}
                GROUP BY
                    q.id, p.base64_data;
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

//?GET QUESTIONS AND ANSWERS
export const getQuestionsAnswers = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let questions = await conn.query(`
                SELECT
                    q.id,
                    q.photo_id,
                    q.content,
                    q.puntuation,
                    q.block_id,
                    p.base64_data,
                    (
                        SELECT
                            GROUP_CONCAT(a.id ORDER BY a.id ASC SEPARATOR ', ') AS answers_ids
                        FROM
                            answers a
                        WHERE
                            a.question_id = q.id
                    ) AS answers_ids
                FROM
                    questions q
                LEFT JOIN
                    photos p ON q.photo_id = p.id
                WHERE
                    q.statement_id = ${req.body.statement_id} AND q.status = 'active';
            `);
            for (const question of questions) {
                question.id = question.id.toString();
                if (question.photo_id) question.photo_id = question.photo_id.toString();
                if (question.block_id) question.block_id = question.block_id.toString();
                question.answers = [];
                let answers_ids = question.answers_ids.split(",");
                for (let answer_id of answers_ids) {
                    let answers = await conn.query(`
                        SELECT
                            a.id,
                            a.content,
                            a.is_correct,
                            a.letter,
                            a.photo_id,
                            p.base64_data
                        FROM
                            answers a
                        LEFT JOIN
                            photos p ON a.photo_id = p.id
                        WHERE
                            a.id = ${answer_id} AND a.status = 'active';
                    `);
                    answers.forEach((answer) => {
                        answer.id = answer.id.toString();
                        if (answer.photo_id) answer.photo_id = answer.photo_id.toString();
                    });
                    question.answers.push(answers[0]);
                };
            };
            res.json(questions);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editQuestions = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        let photoId = null;
        try {
            conn = await pool.getConnection();
            if(req.body.photo ) {
                let photo_id = await conn.query(`
                    INSERT INTO
                        photos (
                            base64_data
                        )
                    VALUES (
                        '${req.body.photo}'
                    );`);
                    photoId = photo_id.insertId.toString();
            };
            let rows = await conn.query(`
                UPDATE
                    questions
                SET
                    statement_id = CASE WHEN ${req.body.statement_id} IS NOT NULL THEN '${req.body.statement_id}' ELSE statement_id END,
                    block_id = CASE WHEN ${req.body.block_id} IS NOT NULL THEN '${req.body.block_id}' ELSE block_id END,
                    puntuation = CASE WHEN ${req.body.puntuation} IS NOT NULL THEN '${req.body.puntuation}' ELSE puntuation END,
                    content = CASE WHEN ${req.body.question} IS NOT NULL THEN '${req.body.question}' ELSE content END,
                    photo_id = CASE WHEN ${photoId} IS NOT NULL THEN '${photoId}' ELSE photo_id END
                WHERE
                    id = ${req.body.id};
                `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    }
};

export const statusQuestionById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if(req.body.status === 'active'){
                let question = await conn.query(`
                    UPDATE
                        questions
                    SET
                        status = 'inactive'
                    WHERE
                        id = ${req.body.id};
                `);
            } else if (req.body.status === 'inactive') {
                let question = await conn.query(`
                    UPDATE
                        questions
                    SET
                        status = 'active'
                    WHERE
                        id = ${req.body.id};
                `);
            };
            res.status(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteQuestionById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let question = await conn.query(`
                DELETE FROM
                    questions
                WHERE
                    id = ${req.body.id};
            `);
            res.status(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};