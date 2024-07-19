import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL ALUMNOS alumnos.get("/", getAlumnos);

export const getAlumnos = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from alumnos");
        rows.forEach(element => {
            element.telefono_alumno = element.telefono_alumno.toString()
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};
