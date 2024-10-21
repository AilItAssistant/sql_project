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
                    id = await conn.query(`
                    SELECT
                        LAST_INSERT_ID()
                    AS
                        last_id;
                `);
                photo_id = photo_id[0].last_id.toString()
            };
            let rows = await conn.query(`
                UPDATE
                    answers
                SET
                    content = CASE WHEN ${req.body.content} IS NOT NULL THEN '${req.body.content}' ELSE content END,
                    photo_id = CASE WHEN ${photo_id} IS NOT NULL THEN '${photo_id}' ELSE photo_id END
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