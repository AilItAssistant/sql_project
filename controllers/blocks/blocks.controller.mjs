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
                    st.name AS status,
                    st.id AS status_id,
                    b.is_selected,
                    b.max_score,
                    qt.name AS question_type_name,
                    qt.id AS question_type_id,
                    b.individual_score
                FROM blocks b
                LEFT JOIN question_types qt ON b.question_type_id = qt.id
                left join status st on b.status_id = st.id
                ORDER BY b.id;
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
                if(element.question_type_id){element.question_type_id = element.question_type_id.toString();}
                element.status_id = element.status_id.toString();
            });
            for(let i = 0; rows.length > i; i++){
                let skills = await conn.query(`
                    select
                        l.name as skill,
                        l.id as skill_id
                    from skills_blocks sb
                    join skills l on sb.skill_id = l.id
                    where sb.block_id = ${rows[i].id};
                `);
                skills.forEach(element => {
                    element.skill_id = element.skill_id.toString();
                });
                rows[i].skills = skills;
            };
            for(let i = 0; rows.length > i; i++){
                let levels = await conn.query(`
                    select
                        l.name as level,
                        l.id as level_id
                    from levels_blocks lb
                    join levels l on lb.level_id = l.id
                    where lb.block_id = ${rows[i].id};
                `);
                levels.forEach(element => {
                    element.level_id = element.level_id.toString();
                });
                rows[i].levels = levels;
            };
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
            let rows = await conn.query(`
                SELECT
                    b.id AS id,
                    b.name AS name,
                    st.name AS status,
                    st.id AS status_id,
                    b.is_selected,
                    b.max_score,
                    qt.name AS question_type_name,
                    qt.id AS question_type_id,
                    b.individual_score
                FROM blocks b
                LEFT JOIN question_types qt ON b.question_type_id = qt.id
                left join status st on b.status_id = st.id
                where b.status = 1
                order by b.id;
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
                if(element.question_type_id){element.question_type_id = element.question_type_id.toString();}
                if(element.status_id){element.status_id = element.status_id.toString();}
            });
            for(let i = 0; rows.length > i; i++){
                let skills = await conn.query(`
                    select
                        l.name as skill,
                        l.id as skill_id
                    from skills_blocks sb
                    join skills l on sb.skill_id = l.id
                    where sb.block_id = ${rows[i].id};
                `);
                skills.forEach(element => {
                    element.skill_id = element.skill_id.toString();
                });
                rows[i].skills = skills;
            };
            for(let i = 0; rows.length > i; i++){
                let levels = await conn.query(`
                    select
                        l.name as level,
                        l.id as level_id
                    from levels_blocks lb
                    join levels l on lb.level_id = l.id
                    where lb.block_id = ${rows[i].id};
                `);
                levels.forEach(element => {
                    element.level_id = element.level_id.toString();
                });
                rows[i].levels = levels;
            };
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET BLOCKS BY SKILL_ID
export const blocksById = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    b.id AS id,
                    b.name AS name,
                    st.name AS status,
                    st.id AS status_id,
                    b.is_selected,
                    b.max_score,
                    qt.name AS question_type_name,
                    qt.id AS question_type_id,
                    b.individual_score
                FROM blocks b
                LEFT JOIN question_types qt ON b.question_type_id = qt.id
                left join status st on b.status_id = st.id
                left join skills_blocks sb on b.id = sb.block_id
                where sb.skill_id = ${req.body.skill_id} and st.id = 1
                order by b.id;
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
                if(element.question_type_id){element.question_type_id = element.question_type_id.toString();}
                if(element.status_id){element.status_id = element.status_id.toString();}
            });
            for(let i = 0; rows.length > i; i++){
                let skills = await conn.query(`
                    select
                        l.name as skill,
                        l.id as skill_id
                    from skills_blocks sb
                    join skills l on sb.skill_id = l.id
                    where sb.block_id = ${rows[i].id};
                `);
                skills.forEach(element => {
                    element.skill_id = element.skill_id.toString();
                });
                rows[i].skills = skills;
            };
            for(let i = 0; rows.length > i; i++){
                let levels = await conn.query(`
                    select
                        l.name as level,
                        l.id as level_id
                    from levels_blocks lb
                    join levels l on lb.level_id = l.id
                    where lb.block_id = ${rows[i].id};
                `);
                levels.forEach(element => {
                    element.level_id = element.level_id.toString();
                });
                rows[i].levels = levels;
            };
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editBlock = async (req, res, next) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                UPDATE blocks
                SET
                    name = COALESCE(${req.body.name}, name),
                    question_type_id = COALESCE(${req.body.type}, question_type_id),
                    max_score = COALESCE(${req.body.score}, max_score),
                    individual_score = COALESCE(${req.body.individual_score}, individual_score),
                    is_selected = COALESCE(${req.body.is_selected}, is_selected)
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

export const statusBlock = async (req, res, next) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                UPDATE blocks SET status_id = ${req.body.status}
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

export const addBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO blocks (name, status_id, max_score, question_type_id, individual_score, is_selected)
                VALUES ('${req.body.name}', 1, ${req.body.score}, ${req.body.type}, ${req.body.puntuation}, ${req.body.is_selected});
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const deleteBlock = async (req, res) => {55
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`DELETE FROM blocks WHERE id = ${req.body.id};`);
            res.json(200);
        } catch (error) {
            console.log(error);
            res.json("No se pudo borrar " + error)
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
                    WHERE skill_id LIKE ${req.body.skill};
                `);
                rows.forEach(element => {
                element.id = element.id.toString();
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
            });
                res.json(rows);
            } else if( req.body.skill === ""  || req.body.skill === null ){
                let rows = await conn.query(`
                    SELECT
                        b.id AS id,
                        b.name AS name,
                        st.name AS status,
                        st.id AS status_id,
                        b.is_selected,
                        b.max_score,
                        qt.name AS question_type_name,
                        qt.id AS question_type_id,
                        b.individual_score
                    FROM blocks b
                    LEFT JOIN question_types qt ON b.question_type_id = qt.id
                    left join status st on b.status_id = st.id
                    WHERE b.name LIKE '${req.body.name}%';`);
                rows.forEach(element => {
                    element.id = element.id.toString();
                    if(element.skill_id){element.skill_id = element.skill_id.toString();}
                    if(element.question_type_id){element.question_type_id = element.question_type_id.toString();}
                    if(element.status_id){element.status_id = element.status_id.toString();}
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
            for(let i = 0; rows.length > i; i++){
                let skills = await conn.query(`
                    select
                        l.name as skill,
                        l.id as skill_id
                    from skills_blocks sb
                    join skills l on sb.skill_id = l.id
                    where sb.block_id = ${rows[i].id};
                `);
                skills.forEach(element => {
                    element.skill_id = element.skill_id.toString();
                });
                rows[i].skills = skills;
            };
                res.json(rows);
            }
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const selectedChange = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let select = await conn.query(`select is_selected from blocks where id = ${req.body.id};`);
            if(select[0].is_selected === 0){
                await conn.query(`UPDATE blocks SET is_selected = 1 WHERE id = ${req.body.id};`);
            } else if (select[0].is_selected === 1) {
                await conn.query(`UPDATE blocks SET is_selected = 0 WHERE id = ${req.body.id};`);
            };
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?ADD SKILL TO BLOCK
export const addSkilltoBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let exist = await conn.query(`
                select * from skills_blocks
                where block_id = ${req.body.block_id};`);
                let skills;
            if (exist.length === 0){
                await conn.query(`
                    INSERT INTO skills_blocks (block_id, skill_id)
                    VALUES (${req.body.block_id}, ${req.body.skill_id});
                `);
                skills = await conn.query(`
                    select
                        l.name as skill,
                        l.id as skill_id
                    from skills_blocks sb
                    join skills l on sb.skill_id = l.id
                    where sb.block_id = ${req.body.block_id};
                `);
                skills.forEach(element => {
                    element.skill_id = element.skill_id.toString();
                });
            } else {
                skills = "Already exist";
            };
            console.log(exist)
            console.log(exist.length)
            console.log(exist.length >= 1)
            console.log(skills)
            res.json(skills);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?DELETE SKILL TO BLOCK
export const deleteSkilltoBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM skills_blocks
                WHERE skill_id = ${req.body.skill_id} and block_id = ${req.body.block_id};
            `);
            let skills = await conn.query(`
                select
                    l.name as skill,
                    l.id as skill_id
                from skills_blocks sb
                join skills l on sb.skill_id = l.id
                where sb.block_id = ${req.body.block_id};
            `);
            skills.forEach(element => {
                element.skill_id = element.skill_id.toString();
            });
            res.json(skills);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?ADD LEVEL TO BLOCK
export const addLeveltoBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO levels_blocks (block_id, level_id)
                VALUES (${req.body.block_id}, ${req.body.level_id});
            `);
            let levels = await conn.query(`
                select
                    l.name as level,
                    l.id as level_id
                from levels_blocks lb
                join levels l on lb.level_id = l.id
                where lb.block_id = ${req.body.block_id};
            `);
            levels.forEach(element => {
                element.level_id = element.level_id.toString();
            });
            res.json(levels);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?DELETE LEVEL TO BLOCK
export const deleteLeveltoBlock = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM levels_blocks
                WHERE level_id = ${req.body.level_id} and block_id = ${req.body.block_id};
            `);
            let levels = await conn.query(`
                select
                    l.name as level,
                    l.id as level_id
                from levels_blocks sb
                join levels l on sb.level_id = l.id
                where sb.block_id = ${req.body.block_id};
            `);
            levels.forEach(element => {
                element.level_id = element.level_id.toString();
            });
            res.json(levels);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET BLOCKS BY SKILL_ID AND LEVEL_ID
export const getBlocksByLevelSkill = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    b.id AS id,
                    b.name AS name,
                    b.is_selected,
                    b.max_score,
                    b.individual_score
                FROM blocks b
                left join status st on b.status_id = st.id
                left join levels_blocks lb on b.id = lb.block_id
                left join skills_blocks sb on b.id = sb.block_id
                where st.id = 1 and lb.level_id = ${req.body.level_id} and sb.skill_id = ${req.body.skill_id}
                ORDER BY b.id;
            `);
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