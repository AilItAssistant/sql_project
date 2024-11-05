import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL TYPES
export const getQuestionTypes = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT *
                FROM question_types
                ORDER BY id;
                `);
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