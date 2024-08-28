import "dotenv/config";
import { pool } from "../../index.mjs";

//?GET ALL USERS users.get("/", getUsers);

export const getUsers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(
            "SELECT id, username, email, role, created_at, name, last_name, phone_number, city, permissions, status from users;"
        );
        console.log(rows)
        rows.forEach((element) => {
            element.id = element.id.toString();
            element.created_at = element.created_at.toLocaleDateString('es-ES', {year: 'numeric', month: 'numeric', day: 'numeric',});
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};