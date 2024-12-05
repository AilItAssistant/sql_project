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
        if(req.body.content === undefined) {req.body.content = null} else {req.body.content = `'${req.body.content}'`};
        let photoId = null;
        try {
            conn = await pool.getConnection();
            let photo_id;
            if(req.body.photo && req.body.photo !== null && req.body.photo !== undefined) {
                photo_id = await conn.query(`
                    INSERT INTO
                        photos (
                            base64_data
                        )
                    VALUES (
                        '${req.body.photo}'
                    );`);
                    photoId = photo_id.insertId.toString();
            } else {
                photo_id = null;
            };
            await conn.query(`
                UPDATE
                    answers
                SET
                    is_correct = COALESCE(${req.body.is_correct}, is_correct),
                    photo_id = COALESCE(${photoId}, photo_id),
                    content = COALESCE(${req.body.content}, content),
                    response = COALESCE(${req.body.link}, response)
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

export const statusAnswerById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if(req.body.status === 'active'){
                await conn.query(`
                    UPDATE
                        answers
                    SET
                        status_id = 0
                    WHERE
                        id = ${req.body.id};
                `);
            } else if (req.body.status === 'inactive') {
                await conn.query(`
                    UPDATE
                        answers
                    SET
                        status_id = 1
                    WHERE
                        id = ${req.body.id};
                `);
            };
            res.json(200);
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
            await conn.query(`
                DELETE FROM
                    answers
                WHERE
                    id = ${req.body.id};
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteImage = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            let photoId;
            conn = await pool.getConnection();
            photoId = await conn.query(`select photo_id from answers where id = ${req.body.id};`);
            photoId = photoId[0].photo_id;
            console.log(photoId);
            await conn.query(`UPDATE answers SET photo_id = NULL WHERE id = ${req.body.id};`);
            conn.query(`DELETE FROM photos WHERE id = ${photoId};`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};