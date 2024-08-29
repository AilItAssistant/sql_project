import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL SKILLS

export const getSkills = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from skills; ");
        
        rows.forEach(element => {
            element.id = element.id.toString();
            if(element.level_id){element.level_id = element.level_id.toString();}
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const editSkill = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE skills SET name = '${req.body.name}', status = '${req.body.status}' WHERE id = ${req.body.id};`);

        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const statusSkill = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE skills SET status = '${req.body.status}' WHERE id = ${req.body.id};`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};