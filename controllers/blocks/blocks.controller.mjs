import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL BLOCKS

export const getBlocks = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name from blocks b left join skills s on b.skill_id = s.id order by b.id; ");
        rows.forEach(element => {
            element.id = element.id.toString();
            if(element.skill_id){element.skill_id = element.skill_id.toString();}
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const editBlock = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE blocks SET name = '${req.body.name}', status = '${req.body.status}', skill_id = '${req.body.secondId}' WHERE id = ${req.body.id};`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const statusBlock = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`UPDATE blocks SET status = '${req.body.status}' WHERE id = ${req.body.id};`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const addBlock = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`INSERT INTO blocks (name, status, skill_id) VALUES ('${req.body.name}', '${req.body.status}', '${req.body.skillId}');`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const deleteBlock = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`DELETE FROM blocks WHERE id = ${req.body.id};`);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const searchBlock = async (req, res) => {
    let conn;
    try {
        console.log(req.body)
        conn = await pool.getConnection();
        if ( req.body.name === "" || req.body.name === null ){
            let rows = await conn.query(`select b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name from blocks b left join skills s on b.skill_id = s.id WHERE skill_id LIKE ${req.body.skill};`);
            rows.forEach(element => {
            element.id = element.id.toString();
            if(element.skill_id){element.skill_id = element.skill_id.toString();}
        });
            res.json(rows);
        } else if( req.body.skill === ""  || req.body.skill === null ){
            let rows = await conn.query(`select b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name from blocks b left join skills s on b.skill_id = s.id WHERE b.name LIKE '${req.body.name}%';`);
            rows.forEach(element => {
            element.id = element.id.toString();
            if(element.skill_id){element.skill_id = element.skill_id.toString();}
        });
            res.json(rows);
        } else if( req.body.skill !== "" && req.body.name !== "" ){
            let rows = await conn.query(`select b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name from blocks b left join skills s on b.skill_id = s.id WHERE b.name LIKE '${req.body.name}%' AND skill_id = ${req.body.skill};`);
            rows.forEach(element => {
            element.id = element.id.toString();
            if(element.skill_id){element.skill_id = element.skill_id.toString();}
        });
            res.json(rows);
        }
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
}


//SELECT c.id AS class_id, c.name AS class_name, c.level AS class_level, c.schedule, c.room_number, c.status AS class_status, t.name AS teacher_name, t.last_name AS teacher_last_name, t.status AS teacher_status, COALESCE(s.name, 'No tiene alumnos') AS student_name, COALESCE(s.last_name, '') AS student_last_name, COALESCE(s.phone_number, '') AS student_phone, COALESCE(s.enrollment_date, '') AS enrollment_date, COALESCE(s.city, '') AS student_city, COALESCE(s.id, '') AS student_id, COALESCE(s.email, '') AS student_email, COALESCE(s.status, 'N/A') AS student_status FROM classes c LEFT JOIN teachers t ON c.teacher_id = t.id LEFT JOIN student_classes sc ON c.id = sc.class_id LEFT JOIN students s ON sc.student_id = s.id WHERE t.last_name LIKE '%' AND c.room_number = '%' AND c.level = '%' AND c.name = '%' ORDER BY c.id, s.id;