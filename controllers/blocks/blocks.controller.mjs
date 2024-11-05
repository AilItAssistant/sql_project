import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL BLOCKS
export const getBlocks = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    b.id AS id,
                    b.name AS name,
                    b.status AS status,
                    b.skill_id AS skill_id,
                    s.name AS skill_name,
                    b.is_selected,
                    b.max_score,
                    qt.name AS question_type_name,
                    qt.id AS question_type_id
                FROM
                    blocks b
                LEFT JOIN skills s ON b.skill_id = s.id
                LEFT JOIN question_types qt ON b.question_type_id = qt.id
                ORDER BY b.id;
                `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
                if(element.question_type_id){element.question_type_id = element.question_type_id.toString();}
            });
            let response = {
                blocks: rows,
                dataLogin: req.data
            };
            res.json(response);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET ACTIVE BLOCKS
export const getActiveBlocks = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query("select b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name from blocks b left join skills s on b.skill_id = s.id where b.status = 'active' order by b.id; ");
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET BLOCKS BY ID
export const blocksById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select
                    b.id as id, b.name as name, b.status as status,
                    b.skill_id as skill_id, s.name as skill_name from blocks b
                left join
                    skills s on b.skill_id = s.id
                where
                    b.skill_id = ${req.body.skill_id} and b.status = 'active'
                order
                    by b.id;
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editBlock = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                UPDATE blocks
                SET
                    skill_id = COALESCE(${req.body.secondId}, skill_id),
                    name = COALESCE(${req.body.name}, name),
                    status = COALESCE(${req.body.status}, status),
                    question_type_id = COALESCE(${req.body.type}, question_type_id),
                    max_score = COALESCE(${req.body.score}, max_score)
                WHERE id = ${req.body.id};
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const statusBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`UPDATE blocks SET status = '${req.body.status}' WHERE id = ${req.body.id};`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const addBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if ( req.body.type === null ) {
                let rows = await conn.query(`
                    INSERT INTO blocks (name, status, skill_id, max_score, question_type_id)
                    VALUES ('${req.body.name}', '${req.body.status}', '${req.body.skillId}', ${req.body.score}, ${req.body.type});
                `);
            } else {
                let rows = await conn.query(`
                    INSERT INTO blocks (name, status, skill_id, max_score)
                    VALUES ('${req.body.name}', '${req.body.status}', '${req.body.skillId}', ${req.body.score});
                `);
            };
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`DELETE FROM blocks WHERE id = ${req.body.id};`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const searchBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            console.log(req.body)
            conn = await pool.getConnection();
            if ( req.body.name === "" || req.body.name === null ){
                let rows = await conn.query(`
                    select
                        b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name, b.is_selected, b.max_score, qt.name AS question_type_name
                    from blocks b
                    LEFT JOIN question_types qt ON b.question_type_id = qt.id
                    left join skills s on b.skill_id = s.id
                    WHERE skill_id LIKE ${req.body.skill};`);
                rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
            });
                res.json(rows);
            } else if( req.body.skill === ""  || req.body.skill === null ){
                let rows = await conn.query(`
                    select
                        b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name, b.is_selected, b.max_score, qt.name AS question_type_name
                    from blocks b
                    LEFT JOIN question_types qt ON b.question_type_id = qt.id
                    left join skills s on b.skill_id = s.id
                    WHERE b.name LIKE '${req.body.name}%';`);
                rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
            });
                res.json(rows);
            } else if( req.body.skill !== "" && req.body.name !== "" ){
                let rows = await conn.query(`
                    select b.id as id, b.name as name, b.status as status, b.skill_id as skill_id, s.name as skill_name, b.is_selected, b.max_score, qt.name AS question_type_name
                    from blocks b
                    LEFT JOIN question_types qt ON b.question_type_id = qt.id
                    left join skills s on b.skill_id = s.id
                    WHERE b.name LIKE '${req.body.name}%' AND skill_id = ${req.body.skill};`);
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
        };
    };
}