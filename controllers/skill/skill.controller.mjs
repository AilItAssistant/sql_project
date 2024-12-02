import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL SKILLS
export const getSkills = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select
                    s.id as id,
                    s.name as name,
                    st.name as status_name,
                    st.id as status_id
                from skills s
                left join status st on s.status_id = st.id
                order by s.id;
            `);
            for(let i = 0; rows.length > i; i++){
                let levels = await conn.query(`
                    select
                        l.name as level,
                        l.id as level_id
                    from levels_skills ls
                    join levels l on ls.level_id = l.id
                    where ls.skill_id = ${rows[i].id};
                `);
                levels.forEach(element => {
                    element.level_id = element.level_id.toString();
                });
                rows[i].levels = levels;
            };
            rows.forEach(element => {
                element.id = element.id.toString();
                if(element.level_id){element.level_id = element.level_id.toString();}
                element.status_id = element.status_id.toString();
            });
            res.json(rows);
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
            let rows = await conn.query(`
                select
                    id,
                    name
                from skills
                where status_id = 1
                order by id;
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

//?GET SKILLS BY ID
export const skillsId = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                select
                    s.id as id,
                    s.name as name,
                    st.name as status_name,
                    st.id as status_id,
                    l.id as level_id,
                    l.name as level_name
                from skills s
                left join levels_skills ls on s.id = ls.skill_id
                left join levels l on ls.level_id = l.id
                left join status st on s.status_id = st.id
                where l.id = ${req.body.level_id} and s.status_id = 1;
            `);
            rows.forEach(element => {
                element.id = element.id.toString();
                element.status_id = element.status_id.toString();
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
                await conn.query(`
                    UPDATE skills
                    SET
                        name = CASE WHEN '${req.body.name}' IS NOT NULL AND '${req.body.name}' != 'null' THEN '${req.body.name}' ELSE name END
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
            await conn.query(`
                UPDATE skills
                SET status_id = ${req.body.status}
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

export const addSkill = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
                await conn.query(`
                    INSERT INTO skills (name, status_id)
                    VALUES ('${req.body.name}', 1);
                `);
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
            await conn.query(`
                DELETE FROM skills
                WHERE id = ${req.body.id};
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
            res.json("No se pudo borrar")
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
                let rows = await conn.query(`
                    select
                        s.id as id,
                        s.name as name,
                        st.name as status_name,
                        st.id as status_id
                    from skills s
                    left join status st on s.status_id = st.id
                    WHERE level_id LIKE ${req.body.level};
                `);
                rows.forEach(element => {
                    element.id = element.id.toString();
                    if(element.level_id){element.level_id = element.level_id.toString();}
                });
                res.json(rows);
            } else if( req.body.level === "" || req.body.level === null ){
                let rows = await conn.query(`
                        select
                        s.id as id,
                        s.name as name,
                        st.name as status_name,
                        st.id as status_id
                    from skills s
                    left join status st on s.status_id = st.id
                    WHERE s.name LIKE '${req.body.name}%';
                    `);
                console.log(rows)
                rows.forEach(element => {
                    element.id = element.id.toString();
                    if(element.level_id){element.level_id = element.level_id.toString();}
                    if(element.status_id){element.status_id = element.status_id.toString();}
                });
                res.json(rows);
            } else if( req.body.level !== "" && req.body.name !== "" ){
                let rows = await conn.query(`
                    select
                        s.id as id,
                        s.name as name,
                        st.name as status_name,
                        st.id as status_id
                    from skills s
                    left join status st on s.status_id = st.id
                    WHERE s.name LIKE '${req.body.name}%' AND level_id = ${req.body.level};`);
                rows.forEach(element => {
                    element.id = element.id.toString();
                    if(element.level_id){element.level_id = element.level_id.toString();}
                });
                console.log(rows)
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

//?ADD LEVEL TO SKILL
export const addLeveltoSkill = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO levels_skills (level_id, skill_id)
                VALUES (${req.body.level_id}, ${req.body.skill_id});
            `);
            let levels = await conn.query(`
                select
                    l.name as level,
                    l.id as level_id
                from levels_skills ls
                join levels l on ls.level_id = l.id
                where ls.skill_id = ${req.body.skill_id};
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

//?DELETE LEVEL TO SKILL
export const deleteLeveltoSkill = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM levels_skills
                WHERE level_id = ${req.body.level_id} and skill_id = ${req.body.skill_id};
            `);
            let levels = await conn.query(`
                select
                    l.name as level,
                    l.id as level_id
                from levels_skills ls
                join levels l on ls.level_id = l.id
                where ls.skill_id = ${req.body.skill_id};
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