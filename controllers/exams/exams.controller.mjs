import "dotenv/config";
import { pool } from "../../index.mjs"
import { statements } from "../../routes/stataments/statements.routes.mjs";

//?GET ALL EXAMS exams.get("/", getExamsA1);

export const generateExamByLevel = async (req, res) => {
    if ( req.data ) {
        let conn;
        let exam = [];
        try {
            conn = await pool.getConnection();

            //*CODE TO MAKE THE UNIONS
            let skill_union = [];
            let unions = await conn.query(`
                select su.id from skills_unions su left join levels_unions lu on lu.union_id = su.id where lu.level_id = ${req.body.level_id} and su.status_id = 1;
            `);
            for(let u = 0; unions.length > u; u++){
                let union_skills = await conn.query(`select * from skills_unions where id = ${unions[u].id}`);
                let skills_unions = await conn.query(`select stu.skill_id as skill from skills_unions su left join skills_to_unions stu on stu.union_id = su.id where su.id = ${unions[u].id}`);

                let typeId = await conn.query(`
                    select question_type_id from blocks b
                    left join skills_blocks sb on sb.block_id = b.id
                    where sb.skill_id = ${skills_unions[0].skill} and b.status_id = 1 and b.is_selected = 1;
                `);
                let type = await conn.query(`select * from question_types where id = ${typeId[0].question_type_id}`);
                type = type.map( element => {
                    element.id = element.id.toString();
                    if (element.block_id) element.block_id = element.block_id.toString();
                    if (element.skill_id) element.skill_id = element.skill_id.toString();
                    if (element.level_id) element.level_id = element.level_id.toString();
                    return element;
                })[0];
                skill_union[u] = { content: union_skills[0].statement, score: union_skills[0].max_puntuation, questions: [], type: type, score: union_skills[0].max_score };

                //*BLOCK 1
                let blocks_1 = await conn.query(`
                    select b.id, b.max_score, b.question_type_id, b.individual_score
                    from blocks b
                    left join levels_blocks lb on lb.block_id = b.id
                    left join skills_blocks sb on sb.block_id = b.id
                    where sb.skill_id = ${skills_unions[0].skill} and b.status_id = 1 and b.is_selected = 1 and level_id = ${req.body.level_id};
                `);
                for(let b1 = 0; blocks_1.length > b1; b1++){
                    let questions_ids = await conn.query(`
                        select id from questions
                        where status_id = 1 and block_id = ${blocks_1[b1].id} and level_id = ${req.body.level_id};
                    `);
                    if(questions_ids.length > 0){
                        let question_id = [];
                        for(let rep = 0; blocks_1[b1].max_score / blocks_1[b1].individual_score > rep; rep++ ){
                            let id = questions_ids[Math.floor( Math.random() * questions_ids.length )];
                            questions_ids = questions_ids.filter(q => q != id);
                            question_id.push(id);
                        };
                        let question = {};
                        for(let q = 0; question_id.length > q; q++){
                            let questionResult = await conn.query(`select * from questions where id = ${question_id[q].id}`);
                            question = questionResult.map( element => {
                                element.id = element.id.toString();
                                if (element.block_id) element.block_id = element.block_id.toString();
                                if (element.skill_id) element.skill_id = element.skill_id.toString();
                                if (element.level_id) element.level_id = element.level_id.toString();
                                if (element.status_id) element.status_id = element.status_id.toString();
                                return element;
                            })[0];
                            let answer = await conn.query(`SELECT * FROM answers WHERE status_id = 1 AND question_id = ${question.id}`);
                            question.answers = answer.map( element => {
                                element.id = element.id.toString();
                                if (element.question_id) element.question_id = element.question_id.toString();
                                if (element.status_id) element.status_id = element.status_id.toString();
                                return element;
                            });
                            skill_union[u].questions.push(question);
                        };
                    }
                };

                //*BLOCK 2
                let blocks_2 = await conn.query(`
                    select b.id, b.max_score, b.question_type_id, b.individual_score
                    from blocks b
                    left join levels_blocks lb on lb.block_id = b.id
                    left join skills_blocks sb on sb.block_id = b.id
                    where sb.skill_id = ${skills_unions[1].skill} and b.status_id = 1 and b.is_selected = 1 and level_id = ${req.body.level_id};
                `);
                for(let b2 = 0; blocks_2.length > b2; b2++){
                    let questions_ids = await conn.query(`
                        select id from questions
                        where status_id = 1 and block_id = ${blocks_2[b2].id} and level_id = ${req.body.level_id};
                    `);
                        if(questions_ids.length > 0){
                            let question_id = [];
                            for(let rep = 0; blocks_2[b2].max_score / blocks_2[b2].individual_score > rep; rep++ ){
                                let id = questions_ids[Math.floor( Math.random() * questions_ids.length )];
                                questions_ids = questions_ids.filter(q => q != id);
                                question_id.push(id);
                            };
                            let question = {};
                            for(let q = 0; question_id.length > q; q++){
                                let questionResult = await conn.query(`select * from questions where id = ${question_id[q].id}`);
                                question = questionResult.map( element => {
                                    element.id = element.id.toString();
                                    if (element.block_id) element.block_id = element.block_id.toString();
                                    if (element.skill_id) element.skill_id = element.skill_id.toString();
                                    if (element.level_id) element.level_id = element.level_id.toString();
                                    if (element.status_id) element.status_id = element.status_id.toString();
                                    return element;
                                })[0];
                                let answer = await conn.query(`SELECT * FROM answers WHERE status_id = 1 AND question_id = ${question.id}`);
                                question.answers = answer.map( element => {
                                    element.id = element.id.toString();
                                    if (element.question_id) element.question_id = element.question_id.toString();
                                    if (element.status_id) element.status_id = element.status_id.toString();
                                    return element;
                                });
                                skill_union[u].questions.push(question);
                            };
                        }
                };

                //*ADD TO EXAM
                exam.push(skill_union[u]);
            };

            //*CODE SKILLS WITHOUT UNIONS
            let skillsWithoutUnions = await conn.query(`
                SELECT s.id FROM skills s
                left join levels_skills ls on ls.skill_id = s.id
                WHERE ls.level_id = ${req.body.level_id} and s.status_id = 1 AND s.id NOT IN
                (
                    SELECT stu.skill_id FROM skills_unions su
                    left join skills_to_unions stu on stu.union_id = su.id
                    left join levels_unions lu on lu.union_id = su.id
                    where lu.level_id = ${req.body.level_id} and su.status_id = 1
                )
            `);

            for(let s = 0; skillsWithoutUnions.length > s; s++){
                let blocks = await conn.query(`
                    select b.id, b.question_type_id, sb.skill_id, b.individual_score, b.max_score from blocks b
                    left join skills_blocks sb on sb.block_id = b.id
                    where b.status_id = 1 and b.is_selected = 1 and sb.skill_id = ${skillsWithoutUnions[s].id}`);
                for(let b = 0; blocks.length > b; b++){
                    let type = await conn.query(`select * from question_types where id = ${blocks[b].question_type_id}`);
                    type = type.map( element => {
                        element.id = element.id.toString();
                        return element;
                    })[0];
                    blocks[b].type = [];
                    blocks[b].type.push(type);
                    //WITH STATEMENT
                    if(type.statement === 1){
                        let stataments_ids = await conn.query(`
                            select id from statements where skill_id = ${blocks[b].skill_id} and status_id = 1 and level_id = ${req.body.level_id}
                        `);
                        let statement_id = [];
                        if(stataments_ids.length > 0){
                            for(let rep = 0; blocks[b].max_score / blocks[b].individual_score > rep; rep++ ){
                                let id = stataments_ids[Math.floor( Math.random() * stataments_ids.length )];
                                stataments_ids = stataments_ids.filter(q => q != id);
                                statement_id.push(id);
                            };
                            for(let st = 0; statement_id.length > st; st++){
                                let statement = await conn.query(`select * from statements where id = ${statement_id[st].id};`);
                                statement = statement.map( element => {
                                    element.id = element.id.toString();
                                    if (element.skill_id) element.skill_id = element.skill_id.toString();
                                    if (element.level_id) element.level_id = element.level_id.toString();
                                    if (element.photo_id) element.photo_id = element.photo_id.toString();
                                    if (element.status_id) element.status_id = element.status_id.toString();
                                    if (element.block_id) element.block_id = element.block_id.toString();
                                    return element;
                                })[0];
                                statement.type = type;
                                if(type.photo >= 1 && statement.photo_id ){
                                    let photo = await conn.query(`select base64_data from photos where status_id = 1 and id = ${statement.photo_id}`);
                                    statement.photo = photo[0].base64_data;
                                };
                                if(type.question >= 1){
                                    let questions = await conn.query(`select * from questions where status_id = 1 and statement_id = ${statement.id}`);
                                    questions = questions.map( element => {
                                        element.id = element.id.toString();
                                        if (element.statement_id) element.statement_id = element.statement_id.toString();
                                        if (element.block_id) element.block_id = element.block_id.toString();
                                        if (element.skill_id) element.skill_id = element.skill_id.toString();
                                        if (element.level_id) element.level_id = element.level_id.toString();
                                        if (element.status_id) element.status_id = element.status_id.toString();
                                        return element;
                                    });
                                    if(type.answer >= 1){
                                        for(let q = 0; questions.length > q; q++){
                                            let answers = await conn.query(`select * from answers where status_id = 1 and question_id = ${questions[q].id}`);
                                            answers = answers.map( element => {
                                                element.id = element.id.toString();
                                                if (element.question_id) element.question_id = element.question_id.toString();
                                                if (element.photo_id && element.photo_id !== null) element.photo_id = element.photo_id.toString();
                                                if (element.status_id) element.status_id = element.status_id.toString();
                                                return element;
                                            });
                                            questions[q].answers = answers;
                                        };
                                    };
                                    statement.questions = questions;
                                };
                                exam.push(statement)
                            };
                        }

                    //WITHOUT STATEMENT
                    } else if (type.question >= 1){
                        let questions_ids = await conn.query(`select id from questions where block_id = ${blocks[b].id} and level_id = ${req.body.level_id}`);
                        let question_id = [];
                        if(questions_ids.length > 0){
                            for(let rep = 0; blocks[b].max_score / blocks[b].individual_score > rep; rep++ ){
                                let id = questions_ids[Math.floor( Math.random() * questions_ids.length )];
                                questions_ids = questions_ids.filter(q => q != id);
                                question_id.push(id);
                            };
                            for(let st = 0; question_id.length > st; st++){
                                let question = await conn.query(`select * from questions where id = ${question_id[st].id};`);
                                let answers = await conn.query(`select * from answers where status_id = 1 and question_id = ${question[0].id}`);
                                if(type.photo >= 1){
                                    for(let a = 0; answers.length > a; a++){
                                        let photo = await conn.query(`select base64_data from photos where status_id = 1 and id = ${answers[a].photo_id}`);
                                        answers[a].photo = photo[0].base64_data;
                                    };
                                };
                                question = question.map( element => {
                                    element.id = element.id.toString();
                                    if (element.block_id) element.block_id = element.block_id.toString();
                                    if (element.skill_id) element.skill_id = element.skill_id.toString();
                                    if (element.level_id) element.level_id = element.level_id.toString();
                                    if (element.status_id) element.status_id = element.status_id.toString();
                                    return element;
                                })[0];
                                answers = answers.map( element => {
                                    element.id = element.id.toString();
                                    if (element.question_id) element.question_id = element.question_id.toString();
                                    if (element.photo_id && element.photo_id !== null) element.photo_id = element.photo_id.toString();
                                    if (element.status_id) element.status_id = element.status_id.toString();
                                    return element;
                                });
                                let result = question;
                                result.answers = answers;
                                result.type = type;
                                exam.push(result)
                            };
                        }
                    };
                };
            };
            res.json(exam);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};