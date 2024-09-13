import "dotenv/config";
import { pool } from "../../index.mjs"

export const getAnswerById = async (req, res) => {
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
        });
        res.json(answer);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    };
};