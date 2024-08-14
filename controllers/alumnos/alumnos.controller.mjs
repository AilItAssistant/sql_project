import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL ALUMNOS alumnos.get("/", getAlumnos);

export const getAlumnos = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("SELECT * from students");
        rows.forEach(element => {
            element.id = element.id.toString();
            element.class_id = element.class_id.toString();
        });
        console.log(rows)
        
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};
