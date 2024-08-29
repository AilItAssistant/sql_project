import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL BLOCKS

export const getBlocks = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name from blocks b left join skills s on b.skill_id = s.id order by b.id; ");
        rows.forEach(element => {
            element.id = element.id.toString();
            if(element.skill_id){element.skill_id = element.skill_id.toString();}
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
        let rows = await conn.query(`UPDATE blocks SET name = '${req.body.name}', status = '${req.body.status}', skill_id = '${req.body.secondId}' WHERE id = ${req.body.id};`);
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

export const addBlock = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`INSERT INTO blocks (name, status, skill_id) VALUES ('${req.body.name}', '${req.body.status}', '${req.body.skillId}');`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const deleteBlock = async (req, res) => {
    let conn;
    try {
        console.log(req.body)
        conn = await pool.getConnection();
        let rows = await conn.query(`DELETE FROM blocks WHERE id = ${req.body.id};`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};