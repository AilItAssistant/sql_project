
import "dotenv/config";
import mariadb from "mariadb";

//?GET ALL ACCOMMODATIOS accommodations.get("/", getAccommodations);

export const getAccommodations = async (req, res) => {
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
        let rows = await conn.query("select * from accommodation");
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};
