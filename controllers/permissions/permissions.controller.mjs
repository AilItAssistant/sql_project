import "dotenv/config";
import { pool } from "../../index.mjs";

export const getPermissions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select * from permissions where status_id = 1;
            `);
            console.log('rows')
            rows.forEach((element) => {
                element.id = element.id.toString();
                if(element.status_id){element.status_id = element.status_id.toString();};
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    };
};