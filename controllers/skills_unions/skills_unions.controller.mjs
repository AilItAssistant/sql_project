import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL SKILLS
export const getSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let response = await conn.query(`
                SELECT su.id, su.name, su.statement, s1.name AS skill_name_1, s2.name AS skill_name_2, l.name AS level_name, su.status
                from skills_unions su
                JOIN skills s1 ON su.skill_id_1 = s1.id
                JOIN skills s2 ON su.skill_id_2 = s2.id
                JOIN levels l ON su.level_id = l.id;
            `);
            response.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id_1){element.skill_id_1 = element.skill_id_1.toString();}
                if(element.skill_id_2){element.skill_id_2 = element.skill_id_2.toString();}
                if(element.level_id){element.level_id = element.level_id.toString();}
            });
            res.json(response);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?DELETE ALL SKILLS
export const deleteSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM skills_unions WHERE id = ${req.body.id};
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?DESACTIVATE ALL SKILLS
export const desactivateSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let status = await conn.query(`select status from skills_unions where id = ${req.body.id}`);
            status = status[0].status;
            if ( status === "active" ) {
                await conn.query(`UPDATE skills_unions SET status = 'inactive' WHERE id = ${req.body.id};`);
            } else {
                await conn.query(`UPDATE skills_unions SET status = 'active' WHERE id = ${req.body.id};`);
            };
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                UPDATE skills_unions
                SET
                    name = CASE WHEN '${req.body.name}' IS NOT NULL AND '${req.body.name}' != 'null' THEN '${req.body.name}' ELSE name END,
                    statement = CASE WHEN '${req.body.statement}' IS NOT NULL AND '${req.body.statement}' != 'null' THEN '${req.body.statement}' ELSE statement END,
                    skill_id_1 = COALESCE(${req.body.skill_id_1}, skill_id_1),
                    skill_id_2 = COALESCE(${req.body.skill_id_2}, skill_id_2),
                    level_id = COALESCE(${req.body.level_id}, level_id)
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

export const addSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO skills_unions (
                    name, statement, skill_id_1, skill_id_2, level_id
                )
                VALUES
                    ('${req.body.name}', '${req.body.statement}', ${req.body.skill_id_1},
                    ${req.body.skill_id_2}, ${req.body.level_id});
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};