import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL LEVELS
export const getLevels = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select
                    l.id,
                    l.name,
                    s.id as status_id,
                    s.name as status_name
                from levels l
                left join status s on l.status_id = s.id;
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                element.status_id = element.status_id.toString();
            });
            let response = {
                levels: rows,
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

//?GET ACTIVE LEVELS
export const getActiveLevels = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select
                    l.id,
                    l.name,
                    s.id as status_id,
                    s.name as status_name
                from levels l
                left join status s on l.status_id = s.id
                where status_id = 1;
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.status_id){element.status_id = element.status_id.toString();};
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editLevel = async (req, res, next) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                UPDATE
                    levels SET name = '${req.body.name}'
                WHERE
                    id = ${req.body.id};
            `);
            res.json(200);
            next();
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const statusLevel = async (req, res, next) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                UPDATE levels
                SET status_id = ${req.body.status}
                WHERE id = ${req.body.id};
            `);
            res.json(200);
            next();
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const addLevel = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO levels (name, status_id) VALUES ('${req.body.name}', 1);`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteLevel = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`DELETE FROM levels WHERE id = '${req.body.id}';`);
            res.json(200);
        } catch (error) {
            console.log(error);
            res.json("No se pudo borrar")
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const searchLevel = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            console.log(req.body.name)
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select
                    l.id,
                    l.name,
                    s.id as status_id,
                    s.name as status_name
                from levels l
                left join status s on l.status_id = s.id
                WHERE l.name LIKE '${req.body.name}%';
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                element.status_id = element.status_id.toString();
            });
            console.log(rows)
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET ACTIVE LEVELS, SKILLS AND BLOCKS
export const getActiveLevelsSkillsBlocks = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let levels = await conn.query("select * from levels where status_id = 1;");
            levels.forEach(element => {
                element.id = element.id.toString();
                element.status_id = element.status_id.toString();
            });
            for( let i = 0; i < levels.length; i++ ){
                let skills = await conn.query(`
                    select * from skills s
                    left join levels_skills ls on s.id = ls.skill_id
                    where s.status_id = 1 and ls.level_id = ${levels[i].id}
                `);
                skills.forEach( element => {
                    element.id = element.id.toString();
                    element.status_id = element.status_id.toString();
                    if (element.level_id) { element.level_id = element.level_id.toString(); };
                    if (element.skill_id) { element.skill_id = element.skill_id.toString(); };
                });
                levels[i].skills = skills;

                for( let x = 0; x < levels[i].skills.length; x++ ) {
                    let blocks = await conn.query(`
                        select * from blocks b
                        left join skills_blocks sb on b.id = sb.block_id
                        where b.status_id = 1 and sb.skill_id = ${levels[i].skills[x].id}
                    `);
                    blocks.forEach( element => {
                        element.id = element.id.toString();
                        element.status_id = element.status_id.toString();
                        if (element.skill_id) { element.skill_id = element.skill_id.toString(); };
                        if (element.question_type_id) { element.question_type_id = element.question_type_id.toString(); };
                        if (element.block_id) { element.block_id = element.block_id.toString(); };
                    });
                    levels[i].skills[x].blocks = blocks;
                };
            };
            res.json(levels);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};