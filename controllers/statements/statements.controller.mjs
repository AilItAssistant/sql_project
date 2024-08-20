import "dotenv/config";
import { pool } from "../../index.mjs"
import { statements } from "../../routes/stataments/statements.routes.mjs";

//?GET ALL STATEMENTS

export const getStatements = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from statements ;");
        console.log(rows)
        rows.forEach(element => {
            element.id = element.id.toString();
            element.exam_id = element.exam_id.toString();
            element.skill_id = element.skill_id.toString();
        });
        console.log(rows)
        
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

//?POST STATEMENTS

export const postStatements = async (req, res) => {
    let conn;
    try {
        console.log(req.body);
        conn = await pool.getConnection();
        let rows = await conn.query(`INSERT INTO statements (content, skill_id, text, score, level_id) VALUES ('${req.body.statement}', ${req.body.skills}, '${req.body.text}', ${req.body.puntuation}, ${req.body.level});`);
        console.log(rows)
        
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};