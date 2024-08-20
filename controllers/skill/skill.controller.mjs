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
        });
        
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};