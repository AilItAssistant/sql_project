import "dotenv/config";
import { pool } from "../../index.mjs"


export const getDepartments = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`SELECT * FROM departments`);
            rows.forEach(element => {
                element.id = element.id.toString();
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};