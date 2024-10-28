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
            examIds.writting = await conn.query(`
                    select
                        id
                    from
                        statements
                    where
                        status = "active" and level_id = ${req.body.level_id} and skill_id = 24;
                `);
                examIds.writting = Math.floor( Math.random() * examIds.writting.length );

            examIds.reading = await conn.query(`
                select
                    id
                from
                    statements
                where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 25;
            `);
            examIds.reading = Math.floor( Math.random() * examIds.reading.length );

            examIds.audio = await conn.query(`
                select
                    id
                from
                    statements
                where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 26;
            `);
            examIds.audio = Math.floor( Math.random() * examIds.audio.length );

            examIds.oral = await conn.query(`
                select
                    id
                from
                    statements
                where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 27;
            `);
            examIds.oral = Math.floor( Math.random() * examIds.oral.length );

                //blocks 1 => 5
            examIds.lexiconDF = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 52;
            `);
            examIds.lexiconDF = Math.floor( Math.random() * examIds.lexiconDF.length );

            examIds.lexiconC = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 54;
            `);
            examIds.lexiconC = Math.floor( Math.random() * examIds.lexiconC.length );

            examIds.lexiconR = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 56;
            `);
            examIds.lexiconR = Math.floor( Math.random() * examIds.lexiconR.length );

            examIds.lexiconTA = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 57;
            `);
            examIds.lexiconTA = Math.floor( Math.random() * examIds.lexiconTA.length );

            examIds.lexiconVO = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 1 and block_id = 61;
            `);
            examIds.lexiconVO = Math.floor( Math.random() * examIds.lexiconVO.length );

            //block 2 => 10
            examIds.grammarEH = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 48;
            `);
            examIds.grammarEH = Math.floor( Math.random() * examIds.grammarEH.length );

            examIds.grammarTH = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 49;
            `);
            examIds.grammarTH = Math.floor( Math.random() * examIds.grammarTH.length );

            examIds.grammarGS = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 50;
            `);
            examIds.grammarGS = Math.floor( Math.random() * examIds.grammarGS.length );

            examIds.grammarPI = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 51
            `);
            examIds.grammarPI = Math.floor( Math.random() * examIds.grammarPI.length );

            examIds.grammarGN = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 53;
            `);
            examIds.grammarGN = Math.floor( Math.random() * examIds.grammarGN.length );

            examIds.grammarR = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 55;
            `);
            examIds.grammarR = Math.floor( Math.random() * examIds.grammarR.length );

            examIds.grammarPP = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 58;
            `);
            examIds.grammarPP = Math.floor( Math.random() * examIds.grammarPP.length );

            examIds.grammarPG = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 59;
            `);
            examIds.grammarPG = Math.floor( Math.random() * examIds.grammarPG.length );

            examIds.grammarP = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 60;
            `);
            examIds.grammarP = Math.floor( Math.random() * examIds.grammarP.length );

            examIds.grammarVG = await conn.query(`
                select id from questions where
                    status = "active" and level_id = ${req.body.level_id} and skill_id = 2 and block_id = 62;
            `);
            examIds.grammarVG = Math.floor( Math.random() * examIds.grammarVG.length );

            console.log(examIds)
                /*rows.forEach(element => {
                    element.class_id = element.class_id.toString();
                    if(element.teacher_id){element.teacher_id = element.teacher_id.toString();}
                    if(element.level_id){element.level_id = element.level_id.toString();}
                });*/
            res.json(examIds);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};