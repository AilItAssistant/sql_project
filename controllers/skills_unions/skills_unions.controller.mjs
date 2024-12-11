import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL SKILLS
export const getSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let response = await conn.query(`
                SELECT
                    su.id, su.name, su.statement, su.max_score,
                    s.id as status_id, s.name as status
                from skills_unions su
                left join status s on su.status_id = s.id
            `);
            response.forEach(element => {
                element.id = element.id.toString();
                element.status_id = element.status_id.toString();
            });
            for(let i = 0; response.length > i; i++){
                let levels = await conn.query(`
                    select
                        l.name as level,
                        l.id as level_id
                    from levels_unions lu
                    join levels l on lu.level_id = l.id
                    where lu.union_id = ${response[i].id};
                `);
                levels.forEach(element => {
                    element.level_id = element.level_id.toString();
                });
                response[i].levels = levels;
            };
            for(let i = 0; response.length > i; i++){
                let skills = await conn.query(`
                    select
                        s.name as skill,
                        s.id as skill_id
                    from skills_to_unions su
                    join skills s on su.skill_id = s.id
                    where su.union_id = ${response[i].id};
                `);
                skills.forEach(element => {
                    element.skill_id = element.skill_id.toString();
                });
                response[i].skills = skills;
            };
            res.json(response);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?DELETE ALL UNION
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

//?DESACTIVATE UNIONS
export const desactivateSkillsUnions = async (req, res, next) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let status = await conn.query(`
                select s.name as status
                from skills_unions su
                left join status s on su.status_id = s.id
                where su.id = ${req.body.id}`);
            status = status[0].status;
            if ( status === "active" ) {
                await conn.query(`UPDATE skills_unions SET status_id = 0 WHERE id = ${req.body.id};`);
            } else {
                await conn.query(`UPDATE skills_unions SET status_id = 1 WHERE id = ${req.body.id};`);
            };
            res.json(200);
            next();
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?EDIT UNION
export const editSkillsUnions = async (req, res, next) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                UPDATE skills_unions
                SET
                    name = CASE WHEN '${req.body.name}' IS NOT NULL AND '${req.body.name}' != 'null' THEN '${req.body.name}' ELSE name END,
                    statement = CASE WHEN '${req.body.statement}' IS NOT NULL AND '${req.body.statement}' != 'null' THEN '${req.body.statement}' ELSE statement END,
                    max_score = CASE WHEN ${req.body.max_score} IS NOT NULL AND ${req.body.max_score} != 'null' THEN ${req.body.max_score} ELSE max_score END
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

//?ADD UNION
export const addSkillsUnions = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let row = await conn.query(`
                INSERT INTO skills_unions (
                    name, statement, status_id, max_score
                )
                VALUES
                    ('${req.body.name}', '${req.body.statement}', 1, ${req.body.max_score});
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?ADD SKILL TO UNION
export const addSkilltoUnion = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO skills_to_unions (union_id, skill_id)
                VALUES (${req.body.union_id}, ${req.body.skill_id});
            `);
            let skills = await conn.query(`
                select
                    s.name as skill,
                    s.id as skill_id
                from skills_to_unions stu
                join skills s on stu.skill_id = s.id
                where stu.union_id = ${req.body.union_id};
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

//?DELETE SKILL TO UNION
export const deleteSkilltoUnion = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM skills_to_unions
                WHERE skill_id = ${req.body.skill_id} and union_id = ${req.body.union_id};
            `);
            let skills = await conn.query(`
                select
                    s.name as skill,
                    s.id as skill_id
                from skills_to_unions stu
                join skills s on stu.skill_id = s.id
                where stu.union_id = ${req.body.union_id};
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

//?ADD LEVEL TO UNION
export const addLeveltoUnion = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO levels_unions (union_id, level_id)
                VALUES (${req.body.union_id}, ${req.body.level_id});
            `);
            let levels = await conn.query(`
                select
                    l.name as level,
                    l.id as level_id
                from levels_unions lb
                join levels l on lb.level_id = l.id
                where lb.union_id = ${req.body.union_id};
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

//?DELETE LEVEL TO UNION
export const deleteLeveltoUnion = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM levels_unions
                WHERE level_id = ${req.body.level_id} and union_id = ${req.body.union_id};
            `);
            let levels = await conn.query(`
                select
                    l.name as level,
                    l.id as level_id
                from levels_unions sb
                join levels l on sb.level_id = l.id
                where sb.union_id = ${req.body.union_id};
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