import "dotenv/config";
import { pool } from "../../index.mjs"
import { statements } from "../../routes/stataments/statements.routes.mjs";

//?GET ALL EXAMS exams.get("/", getExamsA1);

export const generateExamByLevel = async (req, res) => {
    //console.log(req.body);
    if ( req.data ) {
        let conn;
        let exam = [];
        try {
            conn = await pool.getConnection();

            //*CODE TO MAKE THE UNIONS
            let skill_union = [];
            let unions = await conn.query(`select id from skills_unions where level_id = ${req.body.level_id} and status = "active"`);
            for(let u = 0; unions.length > u; u++){
                let union_skills = await conn.query(`select * from skills_unions where id = ${unions[u].id}`);

                skill_union[u] = { statement: union_skills[0].statement, puntuation: union_skills[0].max_puntuation, questions: [] };

                //*BLOCK 1
                let blocks_1 = await conn.query(`select id, max_score, question_type_id, individual_score from blocks where skill_id = ${union_skills[0].skill_id_1} and status = "active" and is_selected = 1`);
                for(let b1 = 0; blocks_1.length > b1; b1++){

                    let questions_ids = await conn.query(`select id from questions where status = "active" and block_id = ${blocks_1[b1].id};`);
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
                            return element;
                        })[0];
                        let answer = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${question.id}`);
                        question.answers = answer.map( element => {
                            element.id = element.id.toString();
                            if (element.question_id) element.question_id = element.question_id.toString();
                            return element;
                        });
                        skill_union[u].questions.push(question)
                    };
                };

                //*BLOCK 1
                let blocks_2 = await conn.query(`select id, max_score, question_type_id, individual_score from blocks where skill_id = ${union_skills[0].skill_id_2} and status = "active" and is_selected = 1`);
                for(let b2 = 0; blocks_2.length > b2; b2++){

                    let questions_ids = await conn.query(`select id from questions where status = "active" and block_id = ${blocks_2[b2].id};`);
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
                            return element;
                        })[0];
                        let answer = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${question.id}`);
                        question.answers = answer.map( element => {
                            element.id = element.id.toString();
                            if (element.question_id) element.question_id = element.question_id.toString();
                            return element;
                        });
                        skill_union[u].questions.push(question)
                    };
                };
                exam.push(skill_union[u])
            };

            //*CODE SKILLS WITHOUT UNIONS
            let skillsWithoutUnions = await conn.query(`SELECT s.id FROM skills s WHERE s.level_id = ${req.body.level_id} and s.status = "active" AND s.id NOT IN (
                SELECT su.skill_id_1 FROM skills_unions su where su.level_id = ${req.body.level_id} and su.status = "active"
                UNION
                SELECT su.skill_id_2 FROM skills_unions su where su.level_id = ${req.body.level_id} and su.status = "active"
                )
            `);

            for(let s = 0; skillsWithoutUnions.length > s; s++){
                let blocks = await conn.query(`select id, question_type_id, skill_id, individual_score, max_score from blocks where status = "active" and is_selected = 1 and skill_id = ${skillsWithoutUnions[s].id}`);
                for(let b = 0; blocks.length > b; b++){
                    //console.log(blocks[b])
                    let type = await conn.query(`select * from question_types where id = ${blocks[b].question_type_id}`);
                    //console.log(type[0])
                    blocks[b].type = [];
                    blocks[b].type.push(type);
                    //WITH STATEMENT
                    if(type[0].statement === 1){
                        let stataments_ids = await conn.query(`select id from statements where skill_id = ${blocks[b].skill_id}`);

                        let question_id = [];
                        for(let rep = 0; blocks[b].max_score / blocks[b].individual_score > rep; rep++ ){
                            let id = stataments_ids[Math.floor( Math.random() * stataments_ids.length )];
                            stataments_ids = stataments_ids.filter(q => q != id);
                            question_id.push(id);
                        };

                        for(let st = 0; question_id.length > st; st++){
                            console.log(question_id[st])
                            //let statement = await conn.query(`select * from statements where id = ${question_id[st].id};`);

                        }
                        //WITHOUT STATEMENT
                    } else if (type.question >= 1){
                        let question = await conn.query(`select id from question where block_id = ${blocks[b].id}`);
                        console.log("question")
                        console.log(question);
                    };
                };
            };

            // //*Writting
            // examIds.writting = await conn.query(`
            //     select id from statements where status = "active" and level_id = ${req.body.level_id} and skill_id = 24;`);
            // examIds.writting = examIds.writting[Math.floor( Math.random() * examIds.writting.length )];
            // examIds.writting.id = examIds.writting.id.toString();
            // let statementW = await conn.query(` select * from statements where id = ${examIds.writting.id}`);
            // examIds.writting.statement = statementW.map(element => {
            //     element.id = element.id.toString();
            //     if (element.skill_id) element.skill_id = element.skill_id.toString();
            //     if (element.level_id) element.level_id = element.level_id.toString();
            //     if (element.photo_id) element.photo_id = element.photo_id.toString();
            //     return element;
            // })[0];
            // if (examIds.writting.statement.photo_id){
            //     examIds.writting.statement.photo = await conn.query(`select base64_data from photos where id = ${examIds.writting.statement.photo_id}`);
            //     examIds.writting.statement.photo = examIds.writting.statement.photo[0].base64_data;
            // };


            // //*Reading
            // let reading = await conn.query(`
            //     SELECT id FROM statements WHERE status = 'active' AND level_id = ${req.body.level_id} AND skill_id = 25;
            // `);
            // if (reading.length > 0) {
            //     examIds.reading = reading[Math.floor(Math.random() * reading.length)];
            //     examIds.reading.id = examIds.reading.id.toString();

            //     let statement = await conn.query(`SELECT * FROM statements WHERE status = 'active' AND id = ${examIds.reading.id}`);
            //     examIds.reading.statement = statement.map(element => {
            //         element.id = element.id.toString();
            //         if (element.skill_id) element.skill_id = element.skill_id.toString();
            //         if (element.level_id) element.level_id = element.level_id.toString();
            //         return element;
            //     })[0];

            //     examIds.reading.statement.questions = [];
            //     let questions = await conn.query(`SELECT * FROM questions WHERE status = 'active' AND statement_id = ${examIds.reading.id}`);
            //     examIds.reading.statement.questions = questions.map(element => {
            //         element.id = element.id.toString();
            //         if (element.skill_id) element.skill_id = element.skill_id.toString();
            //         if (element.level_id) element.level_id = element.level_id.toString();
            //         if (element.statement_id) element.statement_id = element.statement_id.toString();
            //         return element;
            //     });

            //     for (let i = 0; i < examIds.reading.statement.questions.length; i++) {
            //         let answers = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${examIds.reading.statement.questions[i].id}`);
            //         examIds.reading.statement.questions[i].answers = answers.map(element => {
            //             element.id = element.id.toString();
            //             if (element.question_id) element.question_id = element.question_id.toString();
            //             return element;
            //         });
            //     }
            // };


            // //*Oral
            // examIds.oral = await conn.query(`
            //     select id from statements where status = "active" and level_id = ${req.body.level_id} and skill_id = 27;`);
            // examIds.oral = examIds.oral[Math.floor( Math.random() * examIds.oral.length )];
            // examIds.oral.id = examIds.oral.id.toString();
            // let statementO = await conn.query(` select * from statements where id = ${examIds.oral.id}`);
            // examIds.oral.statement = statementO.map(element => {
            //     element.id = element.id.toString();
            //     if (element.skill_id) element.skill_id = element.skill_id.toString();
            //     if (element.level_id) element.level_id = element.level_id.toString();
            //     if (element.photo_id) element.photo_id = element.photo_id.toString();
            //     return element;
            // })[0];
            // if (examIds.oral.statement.photo_id){
            //     examIds.oral.statement.photo = await conn.query(`select base64_data from photos where id = ${examIds.oral.statement.photo_id}`);
            //     examIds.oral.statement.photo = examIds.oral.statement.photo[0].base64_data;
            // };


            // //*Audio
            // //? questions with complete answers
            // examIds.audio = {};
            // examIds.audio.phraseQuestion = await conn.query(`select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 26 and block_id = 63;`);
            // examIds.audio.phraseQuestion = examIds.audio.phraseQuestion[Math.floor( Math.random() * examIds.audio.phraseQuestion.length )];
            // examIds.audio.phraseQuestion.id = examIds.audio.phraseQuestion.id.toString();
            // let questionM = await conn.query(`select * from questions where id = ${examIds.audio.phraseQuestion.id};`);
            // examIds.audio.phraseQuestion.question = questionM.map(element => {
            //     element.id = element.id.toString();
            //     if (element.skill_id) element.skill_id = element.skill_id.toString();
            //     if (element.level_id) element.level_id = element.level_id.toString();
            //     if (element.block_id) element.block_id = element.block_id.toString();
            //     return element;
            // })[0];

            // examIds.audio.phraseQuestion.question.answers = [];
            // let answersM = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${examIds.audio.phraseQuestion.question.id}`);
            // examIds.audio.phraseQuestion.question.answers = answersM.map(element => {
            //     element.id = element.id.toString();
            //     if (element.question_id) element.question_id = element.question_id.toString();
            //     return element;
            // });

            // //? Multi photos question
            // examIds.audio.multiQuestion = await conn.query(`select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 26 and block_id = 64;`);
            // examIds.audio.multiQuestion = examIds.audio.multiQuestion[Math.floor( Math.random() * examIds.audio.multiQuestion.length )];
            // examIds.audio.multiQuestion.id = examIds.audio.multiQuestion.id.toString();
            // let questionA = await conn.query(`select * from questions where id = ${examIds.audio.multiQuestion.id};`);
            // examIds.audio.multiQuestion.question = questionA.map(element => {
            //     element.id = element.id.toString();
            //     if (element.skill_id) element.skill_id = element.skill_id.toString();
            //     if (element.level_id) element.level_id = element.level_id.toString();
            //     if (element.block_id) element.block_id = element.block_id.toString();
            //     return element;
            // })[0];
            // examIds.audio.multiQuestion.question.answers = [];
            // let answers = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${examIds.audio.multiQuestion.question.id}`);
            // examIds.audio.multiQuestion.question.answers = answers.map(element => {
            //     element.id = element.id.toString();
            //     if (element.question_id) element.question_id = element.question_id.toString();
            //     if (element.photo_id) element.photo_id = element.photo_id.toString();
            //     return element;
            // });
            // for(let i = 0; examIds.audio.multiQuestion.question.answers.length > i; i++){
            //     if (examIds.audio.multiQuestion.question.answers[i].photo_id){
            //         examIds.audio.multiQuestion.question.answers[i].photo = await conn.query(`select base64_data from photos where id = ${examIds.audio.multiQuestion.question.answers[i].photo_id}`);
            //         examIds.audio.multiQuestion.question.answers[i].photo = examIds.audio.multiQuestion.question.answers[i].photo[0].base64_data;
            //     };
            // }

            res.json(exam);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};