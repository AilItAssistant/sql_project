import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL SKILLS
export const getSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select *
                from skills_unions
                left join levels l on s.level_id = l.id
                order by s.id; `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id_1){element.skill_id_1 = element.skill_id_1.toString();}
                if(element.skill_id_2){element.skill_id_2 = element.skill_id_2.toString();}
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
            let rows = await conn.query(`
                DELETE FROM skill_unions WHERE id = ${req.body.id};
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id_1){element.skill_id_1 = element.skill_id_1.toString();}
                if(element.skill_id_2){element.skill_id_2 = element.skill_id_2.toString();}
            });
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
            let status = await conn.query(`select status fron skills_unions where id = ${req.body.id}`);
            status = status[0].status;
            if ( status === "active" ) {
                await conn.query(`UPDATE skill_unions SET status = 'inactive' WHERE id = ${req.body.id};`);
            } else {
                await conn.query(`UPDATE skill_unions SET status = 'active' WHERE id = ${req.body.id};`);
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
                UPDATE skill_unions
                SET
                    name = CASE WHEN '${req.body.name}' IS NOT NULL AND '${req.body.name}' != 'null' THEN '${req.body.name}' ELSE name END,
                    statement = CASE WHEN '${req.body.statement}' IS NOT NULL AND '${req.body.statement}' != 'null' THEN '${req.body.statement}' ELSE statement END,
                    skill_id_1 = COALESCE(${req.body.skill_id_1}, skill_id_1),
                    skill_id_2 = COALESCE(${req.body.skill_id_2}, skill_id_2)
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
                INSERT INTO skill_unions (name, statement, skill_id_1, skill_id_2, status)
                VALUES
                    ('${req.body.name}', '${req.body.statement}', ${req.body.skill_id_1},
                    ${req.body.skill_id_2}, '${req.body.status}');
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};