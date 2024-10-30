import "dotenv/config";
import { pool } from "../../index.mjs"
import { response } from "express";

//?GET ALL EXAMS exams.get("/", getExamsA1);

export const generateExamByLevel = async (req, res) => {
    console.log(req.body);
    if ( req.data ) {
        let conn;
        let examIds = {};
        try {
            conn = await pool.getConnection();

            //*Writting
            examIds.writting = await conn.query(`
                select id from statements where status = "active" and level_id = ${req.body.level_id} and skill_id = 24;`);
            examIds.writting = examIds.writting[Math.floor( Math.random() * examIds.writting.length )];
            examIds.writting.id = examIds.writting.id.toString();
            let statementW = await conn.query(` select * from statements where id = ${examIds.writting.id}`);
            examIds.writting.statement = statementW.map(element => {
                element.id = element.id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                if (element.photo_id) element.photo_id = element.photo_id.toString();
                return element;
            })[0];
            if (examIds.writting.statement.photo_id){
                examIds.writting.statement.photo = await conn.query(`select base64_data from photos where id = ${examIds.writting.statement.photo_id}`);
                examIds.writting.statement.photo = examIds.writting.statement.photo[0].base64_data;
            };


            //*Reading
            let reading = await conn.query(`
                SELECT id FROM statements WHERE status = 'active' AND level_id = ${req.body.level_id} AND skill_id = 25;
            `);
            if (reading.length > 0) {
                examIds.reading = reading[Math.floor(Math.random() * reading.length)];
                examIds.reading.id = examIds.reading.id.toString();

                let statement = await conn.query(`SELECT * FROM statements WHERE status = 'active' AND id = ${examIds.reading.id}`);
                examIds.reading.statement = statement.map(element => {
                    element.id = element.id.toString();
                    if (element.skill_id) element.skill_id = element.skill_id.toString();
                    if (element.level_id) element.level_id = element.level_id.toString();
                    return element;
                })[0];

                examIds.reading.statement.questions = [];
                let questions = await conn.query(`SELECT * FROM questions WHERE status = 'active' AND statement_id = ${examIds.reading.id}`);
                examIds.reading.statement.questions = questions.map(element => {
                    element.id = element.id.toString();
                    if (element.skill_id) element.skill_id = element.skill_id.toString();
                    if (element.level_id) element.level_id = element.level_id.toString();
                    if (element.statement_id) element.statement_id = element.statement_id.toString();
                    return element;
                });

                for (let i = 0; i < examIds.reading.statement.questions.length; i++) {
                    let answers = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${examIds.reading.statement.questions[i].id}`);
                    examIds.reading.statement.questions[i].answers = answers.map(element => {
                        element.id = element.id.toString();
                        if (element.question_id) element.question_id = element.question_id.toString();
                        return element;
                    });
                }
            };


            //*Oral
            examIds.oral = await conn.query(`
                select id from statements where status = "active" and level_id = ${req.body.level_id} and skill_id = 27;`);
            examIds.oral = examIds.oral[Math.floor( Math.random() * examIds.oral.length )];
            examIds.oral.id = examIds.oral.id.toString();
            let statementO = await conn.query(` select * from statements where id = ${examIds.oral.id}`);
            examIds.oral.statement = statementO.map(element => {
                element.id = element.id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                if (element.photo_id) element.photo_id = element.photo_id.toString();
                return element;
            })[0];
            if (examIds.oral.statement.photo_id){
                examIds.oral.statement.photo = await conn.query(`select base64_data from photos where id = ${examIds.oral.statement.photo_id}`);
                examIds.oral.statement.photo = examIds.oral.statement.photo[0].base64_data;
            };


            //*Audio
            //? questions with complete answers
            examIds.audio = {};
            examIds.audio.phraseQuestion = await conn.query(`select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 26 and block_id = 63;`);
            examIds.audio.phraseQuestion = examIds.audio.phraseQuestion[Math.floor( Math.random() * examIds.audio.phraseQuestion.length )];
            examIds.audio.phraseQuestion.id = examIds.audio.phraseQuestion.id.toString();
            let questionM = await conn.query(`select * from questions where id = ${examIds.audio.phraseQuestion.id};`);
            examIds.audio.phraseQuestion.question = questionM.map(element => {
                element.id = element.id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                return element;
            })[0];

            examIds.audio.phraseQuestion.question.answers = [];
            let answersM = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${examIds.audio.phraseQuestion.question.id}`);
            examIds.audio.phraseQuestion.question.answers = answersM.map(element => {
                element.id = element.id.toString();
                if (element.question_id) element.question_id = element.question_id.toString();
                return element;
            });

            //? Multi photos question
            examIds.audio.multiQuestion = await conn.query(`select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 26 and block_id = 64;`);
            examIds.audio.multiQuestion = examIds.audio.multiQuestion[Math.floor( Math.random() * examIds.audio.multiQuestion.length )];
            examIds.audio.multiQuestion.id = examIds.audio.multiQuestion.id.toString();
            let questionA = await conn.query(`select * from questions where id = ${examIds.audio.multiQuestion.id};`);
            examIds.audio.multiQuestion.question = questionA.map(element => {
                element.id = element.id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                return element;
            })[0];
            examIds.audio.multiQuestion.question.answers = [];
            let answers = await conn.query(`SELECT * FROM answers WHERE status = 'active' AND question_id = ${examIds.audio.multiQuestion.question.id}`);
            examIds.audio.multiQuestion.question.answers = answers.map(element => {
                element.id = element.id.toString();
                if (element.question_id) element.question_id = element.question_id.toString();
                if (element.photo_id) element.photo_id = element.photo_id.toString();
                return element;
            });
            for(let i = 0; examIds.audio.multiQuestion.question.answers.length > i; i++){
                if (examIds.audio.multiQuestion.question.answers[i].photo_id){
                    examIds.audio.multiQuestion.question.answers[i].photo = await conn.query(`select base64_data from photos where id = ${examIds.audio.multiQuestion.question.answers[i].photo_id}`);
                    examIds.audio.multiQuestion.question.answers[i].photo = examIds.audio.multiQuestion.question.answers[i].photo[0].base64_data;
                };
            }


            //*Lexicon and grammar blocks 1 => 5

            examIds.lexiconDF = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 52;`);
            examIds.lexiconDF = examIds.lexiconDF[Math.floor( Math.random() * examIds.lexiconDF.length )];
            examIds.lexiconDF.id = examIds.lexiconDF.id.toString();
            let questionDF = await conn.query(`select * from questions where id = ${examIds.lexiconDF.id}`);
            examIds.lexiconDF.question = questionDF.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.lexiconC = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 54;`);
            examIds.lexiconC = examIds.lexiconC[Math.floor( Math.random() * examIds.lexiconC.length )];
            examIds.lexiconC.id = examIds.lexiconC.id.toString();
            let questionC = await conn.query(`select * from questions where id = ${examIds.lexiconC.id}`);
            examIds.lexiconC.question = questionC.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.lexiconR = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 56;`);
            examIds.lexiconR = examIds.lexiconR[Math.floor( Math.random() * examIds.lexiconR.length )];
            examIds.lexiconR.id = examIds.lexiconR.id.toString();
            let questionR = await conn.query(`select * from questions where id = ${examIds.lexiconR.id}`);
            examIds.lexiconR.question = questionR.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.lexiconTA = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 57;`);
            examIds.lexiconTA = examIds.lexiconTA[Math.floor( Math.random() * examIds.lexiconTA.length )];
            examIds.lexiconTA.id = examIds.lexiconTA.id.toString();
            let questionTA = await conn.query(`select * from questions where id = ${examIds.lexiconTA.id}`);
            examIds.lexiconTA.question = questionTA.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.lexiconVO = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 61;`);
            examIds.lexiconVO = examIds.lexiconVO[Math.floor( Math.random() * examIds.lexiconVO.length )];
            examIds.lexiconVO.id = examIds.lexiconVO.id.toString();
            let questionVO = await conn.query(`select * from questions where id = ${examIds.lexiconVO.id}`);
            examIds.lexiconVO.question = questionVO.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            //block 2 => 10
            examIds.grammarEH = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 48;`);
            examIds.grammarEH = examIds.grammarEH[Math.floor( Math.random() * examIds.grammarEH.length )];
            examIds.grammarEH.id = examIds.grammarEH.id.toString();
            let questionEH = await conn.query(`select * from questions where id = ${examIds.grammarEH.id}`);
            examIds.grammarEH.question = questionEH.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarTH = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 49;`);
            examIds.grammarTH = examIds.grammarTH[Math.floor( Math.random() * examIds.grammarTH.length )];
            examIds.grammarTH.id = examIds.grammarTH.id.toString();
            let questionTH = await conn.query(`select * from questions where id = ${examIds.grammarTH.id}`);
            examIds.grammarTH.question = questionTH.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarGS = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 50;`);
            examIds.grammarGS = examIds.grammarGS[Math.floor( Math.random() * examIds.grammarGS.length )];
            examIds.grammarGS.id = examIds.grammarGS.id.toString();
            let questionGS = await conn.query(`select * from questions where id = ${examIds.grammarGS.id}`);
            examIds.grammarGS.question = questionGS.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarPI = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 51;`);
            examIds.grammarPI = examIds.grammarPI[Math.floor( Math.random() * examIds.grammarPI.length )];
            examIds.grammarPI.id = examIds.grammarPI.id.toString();
            let questionPI = await conn.query(`select * from questions where id = ${examIds.grammarPI.id}`);
            examIds.grammarPI.question = questionPI.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarGN = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 53;`);
            examIds.grammarGN = examIds.grammarGN[Math.floor( Math.random() * examIds.grammarGN.length )];
            examIds.grammarGN.id = examIds.grammarGN.id.toString();
            let questionGN = await conn.query(`select * from questions where id = ${examIds.grammarGN.id}`);
            examIds.grammarGN.question = questionGN.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarR = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 55;`);
            examIds.grammarR = examIds.grammarR[Math.floor( Math.random() * examIds.grammarR.length )];
            examIds.grammarR.id = examIds.grammarR.id.toString();
            let questionR1 = await conn.query(`select * from questions where id = ${examIds.grammarR.id}`);
            examIds.grammarR.question = questionR1.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarPP = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 58;`);
            examIds.grammarPP = examIds.grammarPP[Math.floor( Math.random() * examIds.grammarPP.length )];
            examIds.grammarPP.id = examIds.grammarPP.id.toString();
            let questionPP = await conn.query(`select * from questions where id = ${examIds.grammarPP.id}`);
            examIds.grammarPP.question = questionPP.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarPG = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 59;`);
            examIds.grammarPG = examIds.grammarPG[Math.floor( Math.random() * examIds.grammarPG.length )];
            examIds.grammarPG.id = examIds.grammarPG.id.toString();
            let questionPG = await conn.query(`select * from questions where id = ${examIds.grammarPG.id}`);
            examIds.grammarPG.question = questionPG.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarP = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 60;`);
            examIds.grammarP = examIds.grammarP[Math.floor( Math.random() * examIds.grammarP.length )];
            examIds.grammarP.id = examIds.grammarP.id.toString();
            let questionP = await conn.query(`select * from questions where id = ${examIds.grammarP.id}`);
            examIds.grammarP.question = questionP.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            examIds.grammarVG = await conn.query(`
                select id from questions where status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 62;`);
            examIds.grammarVG = examIds.grammarVG[Math.floor( Math.random() * examIds.grammarVG.length )];
            examIds.grammarVG.id = examIds.grammarVG.id.toString();
            let questionVG = await conn.query(`select * from questions where id = ${examIds.grammarVG.id}`);
            examIds.grammarVG.question = questionVG.map( element => {
                element.id = element.id.toString();
                if (element.block_id) element.block_id = element.block_id.toString();
                if (element.skill_id) element.skill_id = element.skill_id.toString();
                if (element.level_id) element.level_id = element.level_id.toString();
                return element;
            });

            res.json(examIds);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};