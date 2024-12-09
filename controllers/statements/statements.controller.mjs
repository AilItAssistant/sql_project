import "dotenv/config";
import { pool } from "../../index.mjs";
import { answers } from "../../routes/answers/answers.routes.mjs";

//?GET ALL STATEMENTS
export const getStatements = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query("select * from statements;");
            rows.forEach((element) => {
                element.id = element.id.toString();
                if (element.exam_id) {
                    element.exam_id = element.exam_id.toString();
                }
                if (element.skill_id) {
                    element.skill_id = element.skill_id.toString();
                }
                if (element.level_id) {
                    element.level_id = element.level_id.toString();
                }
                if (element.photo_id) {
                    element.photo_id = element.photo_id.toString();
                }
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    }
};

//?GET STATEMENTS BY LEVEL_ID AND SKILL_ID
export const levelSkillStatements = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    s.id,
                    s.content,
                    s.skill_id,
                    s.text,
                    s.score,
                    s.level_id,
                    st.name as status,
                    st.id as status_id,
                    s.photo_id
                FROM statements s
                left join status st on s.status_id = st.id
                WHERE s.skill_id = ${req.body.skill_id} AND s.level_id = ${req.body.level_id}
                GROUP BY s.id;
            `);
            for(let row of rows){
                let questions_id = await conn.query(`
                    select q.id
                    from questions q
                    where q.statement_id = ${row.id}
                `);
                questions_id.forEach((element) => {
                    element = element.id.toString();
                });
                let questions_ids = questions_id.map((element) => element.id.toString());
                row.questions_ids = questions_ids
            };
            rows.forEach((element) => {
                element.status_id = element.status_id.toString();
                element.id = element.id.toString();
                if (element.skill_id) {element.skill_id = element.skill_id.toString();};
                if (element.level_id) {element.level_id = element.level_id.toString();};
                if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                if (element.questionsId) {element.questionsId = element.questionsId.toString();};
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    }
};

//?GET STATEMENTS BY LEVEL_ID, BLOCK_ID AND SKILL_ID
export const levelSkillBlockStatements = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    s.id,
                    s.content,
                    s.skill_id,
                    s.text,
                    s.score,
                    s.level_id,
                    s.status,
                    s.photo_id
                FROM
                    statements s
                JOIN
                    questions q ON s.id = q.statement_id
                JOIN
                    blocks b ON q.block_id = b.id
                WHERE
                    s.skill_id = ${req.body.skill_id}
                    AND
                    s.level_id = ${req.body.level_id}
                    AND
                    b.id = ${req.body.block_id};
            `);
            rows.forEach((element) => {
                if (element.id) {
                    element.id = element.id.toString();
                };
                if (element.skill_id) {
                    element.skill_id = element.skill_id.toString();
                };
                if (element.level_id) {
                    element.level_id = element.level_id.toString();
                };
                if (element.photo_id) {
                    element.photo_id = element.photo_id.toString();
                };
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    }
};

//?GET STATEMENTS BY ID
export const getStatementsById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    s.id,
                    s.content AS statement_content,
                    s.skill_id,
                    sk.name AS skill_name,
                    s.text,
                    s.photo_id,
                    s.score,
                    s.level_id,
                    l.name AS level_name,
                    GROUP_CONCAT(q.id ORDER BY q.id ASC SEPARATOR ', ') AS questions
                FROM
                    statements s
                LEFT JOIN
                    levels l ON s.level_id = l.id
                LEFT JOIN
                    skills sk ON s.skill_id = sk.id
                LEFT JOIN
                    questions q ON q.statement_id = s.id
                WHERE
                    s.id = ${req.params.statementId}
                GROUP BY
                    s.id, l.name;
            `);
            rows.forEach((element) => {
                element.id = element.id.toString();
                if(element.exam_id){element.exam_id = element.exam_id.toString();}
                if(element.skill_id){element.skill_id = element.skill_id.toString();}
                if(element.level_id){element.level_id = element.level_id.toString();}
                if(element.photo_id){element.photo_id = element.photo_id.toString();}
                if(element.score){element.score = element.score.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?POST STATEMENTS
export const postStatements = async (req, res) => {
    if ( req.data ) {
        let conn;
        let id;
        try {
            conn = await pool.getConnection();
            if(req.body.photo && req.body.photo !== null && req.body.photo !== undefined){
                let photo = await conn.query(`
                    INSERT INTO
                        photos (
                            base64_data
                        )
                    VALUES (
                        '${req.body.photo}'
                    );`);
                    id = await conn.query(`
                    SELECT
                        LAST_INSERT_ID()
                    AS
                        last_id;
                    `);
                    id = id[0].last_id.toString();
            } else {
                id = null;
            }
            let rows = await conn.query(
                `INSERT INTO
                    statements (
                        content,
                        skill_id,
                        text,
                        score,
                        level_id,
                        photo_id,
                        block_id
                    )
                VALUES (
                '${req.body.statement}',
                ${req.body.skills},
                '${req.body.text}',
                ${req.body.puntuation},
                ${req.body.level},
                ${id},
                ${req.body.block});`
            );
            res.status(200).json(rows.insertId.toString());
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET STATEMENTS AND DETAILS
export const getStatementsAndDetails = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(
                `SELECT CONCAT('[', GROUP_CONCAT(CONCAT('{','"statement_id": ', s.id, ', ','"statement_content": "',
                    REPLACE(s.content, '"', '\\"'), '", ','"questions": [',IFNULL(q.questions, ''),']','}')ORDER BY s.id SEPARATOR ', '),']') AS result
                FROM statements s LEFT JOIN (SELECT q.statement_id,GROUP_CONCAT(CONCAT('{','"question_id": ', q.id, ', ','"question_to_statement_id": ', q.statement_id, ', ','"question_content": "',
                    REPLACE(q.content, '"', '\\"'), '", ','"answers": [', IFNULL(a.answers, ''), ']','}')ORDER BY q.id SEPARATOR ', ') AS questions
                FROM questions q LEFT JOIN (SELECT a.question_id,GROUP_CONCAT(CONCAT('{','"answer_id": ', a.id, ', ','"answer_to_question_id": ', a.question_id, ', ','"answer_content": "',
                    REPLACE(a.content, '"', '\\"'), '", ','"is_correct": ', a.is_correct, ', ','"letter": "', a.letter, '"','}')ORDER BY a.id SEPARATOR ', ') AS answers
                FROM answers a GROUP BY a.question_id) a ON q.id = a.question_id GROUP BY q.statement_id) q ON s.id = q.statement_id GROUP BY s.id; `
            );
            let resp = [];
            for (let i = 0; rows.length > i; i++) {
                let comodin = JSON.parse(rows[i].result);
                resp.push(comodin[0]);
            }
            res.json(resp);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editStatements = async (req, res) => {
    if ( req.data ) {
        let conn;
        let photoId = null;
        if(req.body.content === undefined || req.body.content === "null") {req.body.content = null};
        if(req.body.text === undefined  || req.body.text === "null") {req.body.text = null};
        try {
            conn = await pool.getConnection();
            if(req.body.photo ) {
                let photo_id = await conn.query(`
                    INSERT INTO photos (base64_data)
                    VALUES ('${req.body.photo}');
                `);
                photoId = photo_id.insertId.toString();
            };
            console.log(photoId)
            await conn.query(`
                UPDATE
                    statements
                SET
                    level_id = CASE WHEN ${req.body.level_id} IS NOT NULL THEN '${req.body.level_id}' ELSE level_id END,
                    skill_id = CASE WHEN ${req.body.skill_id} IS NOT NULL THEN '${req.body.skill_id}' ELSE skill_id END,
                    score = CASE WHEN ${req.body.score} IS NOT NULL THEN '${req.body.score}' ELSE score END,
                    text = CASE WHEN '${req.body.text}' IS NOT NULL AND '${req.body.text}' != 'null' THEN '${req.body.text}' ELSE text END,
                    content = CASE WHEN '${req.body.content}' IS NOT NULL AND '${req.body.content}' != 'null' THEN '${req.body.content}' ELSE content END,
                    photo_id = CASE WHEN ${photoId} IS NOT NULL THEN ${photoId} ELSE photo_id END
                WHERE
                    id = ${req.body.id};
                `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        }
    }
};

export const statusStatementById = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if(req.body.status === 'active'){
                await conn.query(`
                    UPDATE
                        statements
                    SET
                        status_id = 0
                    WHERE
                        id = ${req.body.id};
                `);
            } else if (req.body.status === 'inactive') {
                await conn.query(`
                    UPDATE
                        statements
                    SET
                        status_id = 1
                    WHERE
                        id = ${req.body.id};
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

export const deleteStatementById = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM
                    statements
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

export const deleteImage = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            let photoId;
            conn = await pool.getConnection();
            photoId = await conn.query(`select photo_id from statements where id = ${req.body.id};`);
            photoId = photoId[0].photo_id;
            console.log(photoId);
            await conn.query(`UPDATE statements SET photo_id = NULL WHERE id = ${req.body.id};`);
            conn.query(`DELETE FROM photos WHERE id = ${photoId};`);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET STATEMENTS, QUESTIONS AND ANSWERS WITH ALL DATA BY LEVEL, SKILL AND BLOCK ID
export const getAllByStructureIds = async (req, res) => {
    if(req.data){
        let conn;
        try{
            conn = await pool.getConnection();
            let questions = [];
            let statements = [];
            //*GET STATEMENTS
            //! WITH STATEMENT
                let statement = await conn.query(`
                    select s.id, s.content, s.text, s.level_id, s.skill_id, s.block_id, s.status_id, s.photo_id, score,
                        l.name as level_name, sk.name as skill_name, b.name as block_name, p.base64_data as photo, st.name as status_name
                    from statements s
                    left join levels l on s.level_id = l.id
                    left join skills sk on s.skill_id = sk.id
                    left join blocks b on s.block_id = b.id
                    left join status st on s.status_id = st.id
                    left join photos p on s.photo_id = p.id
                    where s.level_id = ${req.body.level_id} and s.skill_id = ${req.body.skill_id} and s.block_id = ${req.body.block_id};
                `);
                statement.forEach((element) => {
                    element.status_id = element.status_id.toString();
                    element.id = element.id.toString();
                    if (element.level_id) {element.level_id = element.level_id.toString();};
                    if (element.skill_id) {element.skill_id = element.skill_id.toString();};
                    if (element.block_id) {element.block_id = element.block_id.toString();};
                    if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                    element.questions = [];
                });
                if(statement.length > 0){
                    //*GET QUESTIONS
                    for(let q = 0; statement.length > q; q++){
                        let question = await conn.query(`
                            select q.id, q.content, q.score, q.status_id, st.name as status_name, q.statement_id,
                                q.level_id, l.name as level_name, q.skill_id, sk.name as skill_name, q.block_id,
                                b.name as block_name, q.photo_id, p.base64_data as photo
                            from questions q
                            left join levels l on q.level_id = l.id
                            left join skills sk on q.skill_id = sk.id
                            left join blocks b on q.block_id = b.id
                            left join status st on q.status_id = st.id
                            left join photos p on q.photo_id = p.id
                            where q.statement_id = ${statement[q].id};
                        `);
                        question.forEach((element) => {
                            element.status_id = element.status_id.toString();
                            element.id = element.id.toString();
                            if (element.level_id) {element.level_id = element.level_id.toString();};
                            if (element.skill_id) {element.skill_id = element.skill_id.toString();};
                            if (element.block_id) {element.block_id = element.block_id.toString();};
                            if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                            if (element.statement_id) {element.statement_id = element.statement_id.toString();};
                            element.answers = [];
                        });
                        //*GET ANSWERS
                        for(let a = 0; question.length > a; a++){
                            let answer = await conn.query(`
                                select a.id, a.question_id, a.content, a.is_correct, a.status_id, a.letter, a.response,
                                st.name as status_name, a.photo_id, p.base64_data
                                from answers a
                                left join status st on a.status_id = st.id
                                left join photos p on a.photo_id = p.id
                                where a.question_id = ${question[a].id};
                            `);
                            answer.forEach((element) => {
                                element.status_id = element.status_id.toString();
                                element.id = element.id.toString();
                                if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                                if (element.question_id) {element.question_id = element.question_id.toString();};
                            });
                            question[a].answers.push(answer);
                        };
                        statement[q].questions.push(question);
                    };
                    statements.push(statement);
                    let data = {
                        type: "statements",
                        data: statements
                    };
                    res.json(data);
                } else {
                    //! WITHOUT STATEMENT
                    //*GET QUESTIONS
                    let question = await conn.query(`
                        select q.id, q.content, q.score, q.status_id, st.name as status_name, q.statement_id,
                            q.level_id, l.name as level_name, q.skill_id, sk.name as  skill_name, q.block_id,
                            b.name as block_name, q.photo_id, p.base64_data as photo
                        from questions q
                        left join levels l on q.level_id = l.id
                        left join skills sk on q.skill_id = sk.id
                        left join blocks b on q.block_id = b.id
                        left join status st on q.status_id = st.id
                        left join photos p on q.photo_id = p.id
                        where q.level_id = ${req.body.level_id} and q.skill_id = ${req.body.skill_id} and q.block_id = ${req.body.block_id};
                    `);
                    question.forEach((element) => {
                        element.status_id = element.status_id.toString();
                        element.id = element.id.toString();
                        if (element.level_id) {element.level_id = element.level_id.toString();};
                        if (element.skill_id) {element.skill_id = element.skill_id.toString();};
                        if (element.block_id) {element.block_id = element.block_id.toString();};
                        if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                        if (element.statement_id) {element.statement_id = element.statement_id.toString();};
                        element.answers = [];
                    });
                    //*GET ANSWERS
                    for(let a = 0; question.length > a; a++){
                        let answer = await conn.query(`
                            select a.id, a.question_id, a.content, a.is_correct, a.status_id, a.letter, a.response,
                                st.name as status_name, photo_id, p.base64_data
                            from answers a
                            left join status st on a.status_id = st.id
                            left join photos p on a.photo_id = p.id
                            where a.question_id = ${question[a].id};
                        `);
                        answer.forEach((element) => {
                            element.status_id = element.status_id.toString();
                            element.id = element.id.toString();
                            if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                            if (element.question_id) {element.question_id = element.question_id.toString();};
                        });
                        question[a].answers.push(answer);
                    };
                    questions.push(question)
                    let data = {
                        type: "questions",
                        data: questions
                    };
                    res.json(data);
                };
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

//?GET STATEMENTS, QUESTIONS AND ANSWERS WITH ALL DATA BY STATEMENT ID
export const getStatementByStatementId = async (req, res) => {
    console.log(req.body);
    if(req.data){
        let conn;
        try{
            conn = await pool.getConnection();
            let statements = [];
            //*GET STATEMENT
            let statement = await conn.query(`
                select s.id, s.content, s.text, s.level_id, s.skill_id, s.block_id, s.status_id, s.photo_id, score,
                    l.name as level_name, sk.name as skill_name, b.name as block_name, p.base64_data as photo, st.name as status_name
                from statements s
                left join levels l on s.level_id = l.id
                left join skills sk on s.skill_id = sk.id
                left join blocks b on s.block_id = b.id
                left join status st on s.status_id = st.id
                left join photos p on s.photo_id = p.id
                where s.id = ${req.body.statement_id};
            `);
            statement.forEach((element) => {
                element.status_id = element.status_id.toString();
                element.id = element.id.toString();
                if (element.level_id) {element.level_id = element.level_id.toString();};
                if (element.skill_id) {element.skill_id = element.skill_id.toString();};
                if (element.block_id) {element.block_id = element.block_id.toString();};
                if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                element.questions = [];
            });
            //*GET QUESTIONS
            for(let q = 0; statement.length > q; q++){
                let question = await conn.query(`
                    select q.id, q.content, q.score, q.status_id, st.name as status_name, q.statement_id,
                        q.level_id, l.name as level_name, q.skill_id, sk.name as  skill_name, q.block_id,
                        b.name as block_name, photo_id, p.base64_data as photo
                    from questions q
                    left join levels l on q.level_id = l.id
                    left join skills sk on q.skill_id = sk.id
                    left join blocks b on q.block_id = b.id
                    left join status st on q.status = st.id
                    left join photos p on q.photo_id = p.id
                    where q.statment_id = ${statement[q].id};
                `);
                question.forEach((element) => {
                    element.status_id = element.status_id.toString();
                    element.id = element.id.toString();
                    if (element.level_id) {element.level_id = element.level_id.toString();};
                    if (element.skill_id) {element.skill_id = element.skill_id.toString();};
                    if (element.block_id) {element.block_id = element.block_id.toString();};
                    if (element.photo_id) {element.photo_id = element.photo_id.toString();};
                    if (element.statement_id) {element.statement_id = element.statement_id.toString();};
                    element.answers = [];
                });
                //*GET ANSWERS
                for(let a = 0; question.length > a; a++){
                    let answer = await conn.query(`
                        select a.id, a.question_id, a.content, a.is_correct, a.status_id, a.letter, a.response,
                        st.name as status_name, a.photo_id, p.base64_data
                        from answers a
                        left join status st on a.status = st.id
                        left join photos p on a.photo_id = p.id
                        where a.question_id = ${question[a].id};
                    `);
                    question[a].answers.push(answer);
                };
                statement[q].questions.push(question)
            };
            statements.push(statement);
            res.json(statements);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};