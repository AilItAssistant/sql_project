import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL SKILLS
export const getSkills = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query("select s.id as id, s.name as name, s.status as status, s.level_id as level_id, l.name as level_name from skills s left join levels l on s.level_id = l.id order by s.id; ");
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.level_id){element.level_id = element.level_id.toString();}
            });
            let response = {
                skills: rows,
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

//?GET ACTIVE SKILLS
export const getActiveSkills = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query("select s.id as id, s.name as name, s.status as status, s.level_id as level_id, l.name as level_name from skills s left join levels l on s.level_id = l.id where s.status = 'active' order by s.id; ");
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.level_id){element.level_id = element.level_id.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET SKILLS BY ID
export const skillsId = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`select * from skills where level_id = ${req.body.level_id} and status = 'active';`);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.level_id){element.level_id = element.level_id.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editSkill = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
                let rows = await conn.query(`
                    UPDATE skills
                    SET
                        name = CASE WHEN '${req.body.name}' IS NOT NULL AND '${req.body.name}' != 'null' THEN '${req.body.name}' ELSE name END,
                        status = COALESCE(${req.body.status}, status),
                        level_id = COALESCE(${req.body.secondId}, level_id)
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

export const statusSkill = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`UPDATE skills SET status = '${req.body.status}' WHERE id = ${req.body.id};`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const addSkill = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
                let rows = await conn.query(`INSERT INTO skills (name, status, level_id) VALUES ('${req.body.name}', '${req.body.status}', '${req.body.levelId}');`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteSkill = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            console.log(req.body)
            conn = await pool.getConnection();
            let rows = await conn.query(`DELETE FROM skills WHERE id = ${req.body.id};`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const searchSkill = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            console.log(req.body)
            conn = await pool.getConnection();
            if ( req.body.name === "" || req.body.name === null ){
                let rows = await conn.query(`select s.id as id, s.name as name, s.status as status, s.level_id as level_id, l.name as level_name from skills s left join levels l on s.level_id = l.id WHERE level_id LIKE ${req.body.level};`);
                rows.forEach(element => {
                    element.id = element.id.toString();
                    if(element.level_id){element.level_id = element.level_id.toString();}
                });
                res.json(rows);
            } else if( req.body.level === "" || req.body.level === null ){
                let rows = await conn.query(`select s.id as id, s.name as name, s.status as status, s.level_id as level_id, l.name as level_name from skills s left join levels l on s.level_id = l.id WHERE s.name LIKE '${req.body.name}%';`);
                console.log(req.body)
                rows.forEach(element => {
                    element.id = element.id.toString();
                    if(element.level_id){element.level_id = element.level_id.toString();}
                });
                res.json(rows);
            } else if( req.body.level !== "" && req.body.name !== "" ){
                let rows = await conn.query(`select s.id as id, s.name as name, s.status as status, s.level_id as level_id, l.name as level_name from skills s left join levels l on s.level_id = l.id WHERE s.name LIKE '${req.body.name}%' AND level_id = ${req.body.level};`);
                rows.forEach(element => {
                    element.id = element.id.toString();
                    if(element.level_id){element.level_id = element.level_id.toString();}
                });
                res.json(rows);
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET ACTIVE SKILLS
export const getSkillsByLevels = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select s.id as id, s.name as name, s.status as status, s.level_id as level_id, l.name as level_name
                from skills s
                left join levels l on s.level_id = l.id
                where s.status = 'active' and s.level_id = ${req.body.id}
                order by s.id; `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.level_id){element.level_id = element.level_id.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};