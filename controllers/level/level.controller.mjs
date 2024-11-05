import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL LEVELS
export const getLevels = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query("select * from levels; ");
            rows.forEach(element => {
                element.id = element.id.toString();
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
            let rows = await conn.query("select * from levels where status = 'active';");
            rows.forEach(element => {
                element.id = element.id.toString();
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editLevel = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                UPDATE
                    levels SET name = '${req.body.name}',
                    status = '${req.body.status}'
                WHERE
                    id = ${req.body.id};
                `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const statusLevel = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`UPDATE levels SET status = '${req.body.status}' WHERE id = ${req.body.id};`);
            res.json(200);
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
            let rows = await conn.query(`INSERT INTO levels (name, status) VALUES ('${req.body.name}', '${req.body.status}');`);
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
            let rows = await conn.query(`DELETE FROM levels WHERE id = '${req.body.id}';`);
            res.json(200);
        } catch (error) {
            console.log(error);
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
            let rows = await conn.query(`SELECT * FROM levels WHERE name LIKE '${req.body.name}%';`);
            rows.forEach(element => {
                element.id = element.id.toString();
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
            let levels = await conn.query("select * from levels where status = 'active';");
            levels.forEach(element => {
                element.id = element.id.toString();
            });
            for( let i = 0; i < levels.length; i++ ){
                let skills = await conn.query(`select * from skills where status = 'active' and level_id = ${levels[i].id}`);
                skills.forEach( element => {
                    element.id = element.id.toString();
                    if (element.level_id) { element.level_id = element.level_id.toString(); };
                });
                levels[i].skills = skills;

                for( let x = 0; x < levels[i].skills.length; x++ ) {
                    let blocks = await conn.query(`select * from blocks where status = 'active' and skill_id = ${levels[i].skills[x].id}`);
                    blocks.forEach( element => {
                        element.id = element.id.toString();
                        if (element.skill_id) { element.skill_id = element.skill_id.toString(); };
                    });
                    levels[i].skills[x].blocks = blocks;
                }


            };
            console.log(levels[0].skills[0].blocks)

            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};