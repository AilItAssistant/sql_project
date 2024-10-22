import "dotenv/config";
import { pool } from "../../index.mjs"

export const getAnswerById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let answer = await conn.query(`
                SELECT
                    a.*
                FROM
                    answers a
                WHERE
                    a.id = ${req.body.id};
            `);
            answer.forEach((element) => {
                element.id = element.id.toString();
                if(element.question_id){element.question_id = element.question_id.toString();}
                if(element.photo_id){element.photo_id = element.photo_id.toString();}
            });
            res.json(answer);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editAnswers = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        let photoId = null;
        try {
            conn = await pool.getConnection();
            let photo_id = null;
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
            if(req.body.is_correct && req.body.is_correct === 1){
                let question_id = await conn.query(`
                    SELECT question_id FROM answers WHERE id = ${req.body.id};
                `);
                question_id = question_id[0].question_id.toString();
                let answers_ids = await conn.query(`
                    SELECT id
                    FROM answers WHERE question_id = ${question_id};
                `);
                answers_ids.forEach((id) => {
                    let solutions = conn.query(`
                        UPDATE answers
                        SET is_correct = 0 WHERE id = ${id.id.toString()};
                    `);
                });
            };
            if( req.body.content === null){
                let rows = await conn.query(`
                    UPDATE
                        answers
                    SET
                        is_correct = CASE WHEN ${req.body.is_correct} IS NOT NULL THEN '${req.body.is_correct}' ELSE is_correct END,
                        photo_id = CASE WHEN ${photoId} IS NOT NULL THEN '${photoId}' ELSE photo_id END
                    WHERE
                        id = ${req.body.id};
                    `);
            } else if (req.body.content !== null){
                let rows = await conn.query(`
                    UPDATE
                        answers
                    SET
                        is_correct = CASE WHEN ${req.body.is_correct} IS NOT NULL THEN '${req.body.is_correct}' ELSE is_correct END,
                        content = '${req.body.content}'
                    WHERE
                        id = ${req.body.id};
                    `);
            };
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    }
};

export const statusAnswerById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if(req.body.status === 'active'){
                let answer = await conn.query(`
                    UPDATE
                        answers
                    SET
                        status = 'inactive'
                    WHERE
                        id = ${req.body.id};
                `);
            } else if (req.body.status === 'inactive') {
                let answer = await conn.query(`
                    UPDATE
                        answers
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

export const deleteAnswerById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let answer = await conn.query(`
                DELETE FROM
                    answers
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