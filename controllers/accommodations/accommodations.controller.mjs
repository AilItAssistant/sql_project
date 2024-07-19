import "dotenv/config";
import { pool } from "../../index.mjs"


//?GET ALL ACCOMMODATIOS accommodations.get("/", getAccommodations);

export const getAccommodations = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from accommodation");
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};
