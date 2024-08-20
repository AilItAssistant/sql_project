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
        console.log(rows)
        
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};