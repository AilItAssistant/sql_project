import "dotenv/config";
import mariadb from "mariadb";

//?GET ALL ALUMNOS alumnos.get("/", getAlumnos);

export const getAlumnos = async (req, res) => {
    let conn;
    const pool = mariadb.createPool({
        host: process.env.SQL_HOST,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        database: process.env.SQL_DATABASE,
        connectionLimit: 5
    });
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
