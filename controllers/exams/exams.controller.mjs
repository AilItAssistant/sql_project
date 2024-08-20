import "dotenv/config";
import { pool } from "../../index.mjs"
import { response } from "express";

//?GET ALL EXAMS exams.get("/", getExamsA1);

export const getExams = async (req, res) => {
    let conn;

    var exams = [];

    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select * from students");
        res.json(exams);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

//? GET UNVALIDATED ALL EXAMS

export const getUnvalidated = async (req, res) => {
  
};

//? GET EXAM BY STUDENT ID

export const getOnlineExam = async (req, res) => {
  
};