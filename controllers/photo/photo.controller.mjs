import "dotenv/config";
import { pool } from "../../index.mjs";

export const getActivePhotoById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let photos = await conn.query(`
                SELECT
                    *
                FROM
                    photos
                WHERE
                    id = ${req.body.id} AND status_id = 1;
            `);
            photos.forEach((element) => {
                element.id = element.id.toString();
                element.status_id = element.status_id.toString();
            });
            res.json(photos);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};