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
        let rows = await conn.query("select s.id as statement_id, s.content as statement_content, q.id as question_id, q.statement_id as question_to_statement_id, q.content as question_content, a.id as answer_id, a.question_id as answer_to_question_id, a.content as answer_content, a.is_correct from statements s left join questions q on s.id = q.statement_id left join answers a on q.id = a.question_id order by s.id, q.id, a.id; ");
        rows.forEach(element => {
            if(element.statement_id){element.statement_id = element.statement_id.toString();}
            if(element.question_id){element.question_id = element.question_id.toString();}
            if(element.answer_id){element.answer_id = element.answer_id.toString();}
            if(element.question_to_statement_id){element.question_to_statement_id = element.question_to_statement_id.toString();}
            if(element.answer_to_question_id){element.answer_to_question_id = element.answer_to_question_id.toString();}
        });
        console.log(rows)

        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};