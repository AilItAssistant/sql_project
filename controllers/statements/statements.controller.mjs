import "dotenv/config";
import { pool } from "../../index.mjs"


//?GET ALL STATEMENTS

export const getStatements = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from statements ;");
        rows.forEach(element => {
            element.id = element.id.toString();
            if(element.exam_id){element.exam_id = element.exam_id.toString();}
            if(element.skill_id){element.skill_id = element.skill_id.toString();}
            if(element.level_id){element.level_id = element.level_id.toString();}
        });
        
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

//?GET STATEMENTS BY ID

export const getStatementsById = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`SELECT * FROM statements WHERE id = ${req.params.statementId};`);
        rows.forEach(element => {
            element.id = element.id.toString();
            element.exam_id = element.exam_id.toString();
            element.skill_id = element.skill_id.toString();
            element.level_id = element.level_id.toString();
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

//?POST STATEMENTS

export const postStatements = async (req, res) => {
    let conn;
    try {
        console.log(req.body);
        conn = await pool.getConnection();
        let rows = await conn.query(`INSERT INTO statements (content, skill_id, text, score, level_id) VALUES ('${req.body.statement}', ${req.body.skills}, '${req.body.text}', ${req.body.puntuation}, ${req.body.level});`);
        console.log(rows)
        
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

//?GET STATEMENTS AND DETAILS

export const getStatementsAndDetails = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let statements = await conn.query(
            "select s.id as statement_id, s.text as statement_text, s.content as statement_content, l.name as level_name, sk.name as skill_name from statements s left join levels l on s.level_id = l.id left join skills sk on s.skill_id = sk.id order by s.id;");
        let questions = await conn.query(
            "select q.id as question_id, q.statement_id as statement_id, q.content as question_content, l.name as level_name, sk.name as skill_name, b.name as block_name from questions q left join levels l on q.level_id = l.id left join skills sk on q.skill_id = sk.id left join blocks b on q.block_id = b.id order by q.id; "
        );
        let answers = await conn.query("select id, content, is_correct, explanation, question_id from answers; ");

        statements.forEach(element => {
            if(element.statement_id){element.statement_id = element.statement_id.toString();}
        });

        questions.forEach(element => {
            element.question_id = element.question_id.toString(); 
            if(element.statement_id){element.statement_id = element.statement_id.toString();}
        });

        answers.forEach(element => {
            element.id = element.id.toString();
            if(element.question_id){element.question_id = element.question_id.toString();}
        });

        let resp = statements;

        for(let i = 0; statements.length > i; i++){
            for(let x = 0; questions.length > x; x++){
                if(statements[i].id === questions[x].question_id){
                    console.log(statements[i].id);
                    console.log(questions[x].question_id);
                    resp.statements[i].push(questions[i]);
                }
                for(let y = 0; answers.length > y; y++){
                    if(questions[x].id === answers[y].question_id){
                        console.log(questions[x].id);
                        console.log(answers[y].question_id);
                        resp.statements[i].questions[x].answers[y].push(answers[y]);
                    }
                }
            }
        }
        //console.log(statements)


        //let resp = []; resp.push(statements); resp.push(questions); resp.push(answers);
        console.log(resp)
        res.json(resp);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};