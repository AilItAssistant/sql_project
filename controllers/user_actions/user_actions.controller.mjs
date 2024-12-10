import "dotenv/config";
import { pool } from "../../index.mjs";

export const getInfo = async (req, res, next) => {
    let conn;
    if ( req.data ) {
        try {
            conn = await pool.getConnection();
            let content = JSON.stringify(req.body);
            await conn.query(`
                INSERT
                    INTO user_actions(user_id, action_type, data_before, username)
                VALUES
                    (${req.data.id},'status','${content}', '${req.data.username}');
            `);
            next();
        } catch (error) {
            console.log(error);
            next();
        } finally {
            if (conn) return conn.end();
            next();
        };
    } else {
        try {
            conn = await pool.getConnection();
            let content = JSON.stringify(req.body);
            await conn.query(`
                INSERT
                    INTO user_actions(user_id, data_before, username)
                VALUES
                    (${req.data.id},'Without data login', '${req.data.username}');
            `);
            next();
        } catch (error) {
            console.log(error);
            next();
        } finally {
            if (conn) return conn.end();
            next();
        };
    };
};