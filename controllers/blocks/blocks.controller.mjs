import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL BLOCKS

export const getBlocks = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from blocks; ");
        rows.forEach(element => {
            element.id = element.id.toString();
            element.skill_id = element.skill_id.toString();
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const editBlock = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE blocks SET name = '${req.body.name}', status = '${req.body.status}' WHERE id = ${req.body.id};`);

        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const statusBlock = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE blocks SET status = '${req.body.status}' WHERE id = ${req.body.id};`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};