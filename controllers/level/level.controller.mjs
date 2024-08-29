import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL LEVELS

export const getLevels = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from levels; ");
        
        rows.forEach(element => {
            element.id = element.id.toString();
        });
        
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const editLevel = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE levels SET name = '${req.body.name}', status = '${req.body.status}' WHERE id = ${req.body.id};`);

        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const statusLevel = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE levels SET status = '${req.body.status}' WHERE id = ${req.body.id};`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};