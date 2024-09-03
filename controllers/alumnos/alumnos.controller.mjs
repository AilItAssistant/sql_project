import "dotenv/config";
import { pool } from "../../index.mjs";

//?GET ALL ALUMNOS alumnos.get("/", getAlumnos);

export const getAlumnos = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(
            "SELECT s.id AS student_id, s.name AS student_name, s.phone_number AS student_phone_number, s.last_name AS student_last_name, s.email, s.city, s.identification_document, s.status AS student_status, COALESCE(c.name, 'No tiene clase') AS class_name, COALESCE(c.id, 'No tiene id') AS class_id, COALESCE(c.level, 'N/A') AS class_level, COALESCE(t.name, 'N/A') AS teacher_name FROM students s LEFT JOIN student_classes sc ON s.id = sc.student_id LEFT JOIN classes c ON sc.class_id = c.id LEFT JOIN teachers t ON c.teacher_id = t.id ORDER BY s.id, c.id;"
        );
        console.log(rows)
        rows.forEach((element) => {
            element.student_id = element.student_id.toString();
        });
        let response = [];
        for (let i = 0; rows.length > i; i++) {
            let x;
            if (i >= 1) {
                x = i - 1;
            } else {
                x = 0;
            }

            if (i === 0 || rows[i].student_id !== rows[x].student_id) {
                let add = {
                    student_id: rows[i].student_id,
                    email: rows[i].email,
                    phone_number: rows[i].student_phone_number,
                    last_name: rows[i].student_last_name,
                    id_document: rows[i].identification_document,
                    student_level: rows[i].student_level,
                    name: rows[i].student_name,
                    city: rows[i].city,
                    student_phone: rows[i].student_phone,
                    student_status: rows[i].student_status,
                    classes: [],
                };
                response.push(add);
                if (rows[i].class_id !== "No tiene id") {
                    let addClass = {
                        class_id: rows[i].class_id,
                        class_level: rows[i].class_level,
                        class_name: rows[i].class_name,
                        class_teacher: rows[i].teacher_name,
                    };
                    add.classes.push(addClass);
                }
            } else {
                let add = {
                    class_id: rows[i].class_id,
                    class_name: rows[i].class_name,
                    class_level: rows[i].class_level,
                    class_teacher: rows[i].teacher_name,
                };
                response[response.length - 1].classes.push(add);
            }
        }
        res.json(response);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const filterAlumnos = async (req, res) => {
    let conn;
    try {
        console.log(req.body)
        conn = await pool.getConnection();
        let rows = await conn.query(
            `SELECT
                s.id AS student_id, s.name AS student_name, s.phone_number AS student_phone_number, 
                s.last_name AS student_last_name, s.email, s.level AS student_level, s.city, 
                s.identification_document, s.status AS student_status, 
                COALESCE(c.name, 'No tiene clase') AS class_name, 
                COALESCE(c.id, 'No tiene id') AS class_id, 
                COALESCE(c.level, 'N/A') AS class_level, 
                COALESCE(t.name, 'N/A') AS teacher_name 
            FROM 
                students s 
            LEFT JOIN 
                student_classes sc ON s.id = sc.student_id 
            LEFT JOIN 
                classes c ON sc.class_id = c.id 
            LEFT JOIN 
                teachers t ON c.teacher_id = t.id 
            WHERE 
                (s.last_name LIKE CONCAT(IFNULL('${req.body.last_name}', ''), '%')) OR
                (s.identification_document LIKE CONCAT(IFNULL('${req.body.identification_numer}', ''), '%')) OR
                (s.phone_number LIKE CONCAT(IFNULL('${req.body.phone_number}', ''), '%')) OR
                (s.city LIKE CONCAT(IFNULL('${req.body.city}', ''), '%')) OR
                (s.email LIKE CONCAT(IFNULL('${req.body.email}', ''), '%'))
            ORDER BY 
                s.id, c.id;`
                    );
        console.log(rows)
        rows.forEach((element) => {
            element.student_id = element.student_id.toString();
        });
        let response = [];
        for (let i = 0; rows.length > i; i++) {
            let x;
            if (i >= 1) {
                x = i - 1;
            } else {
                x = 0;
            }

            if (i === 0 || rows[i].student_id !== rows[x].student_id) {
                let add = {
                    student_id: rows[i].student_id,
                    email: rows[i].email,
                    phone_number: rows[i].student_phone_number,
                    last_name: rows[i].student_last_name,
                    id_document: rows[i].identification_document,
                    student_level: rows[i].student_level,
                    name: rows[i].student_name,
                    city: rows[i].city,
                    student_phone: rows[i].student_phone,
                    student_status: rows[i].student_status,
                    classes: [],
                };
                response.push(add);
                if (rows[i].class_id !== "No tiene id") {
                    let addClass = {
                        class_id: rows[i].class_id,
                        class_level: rows[i].class_level,
                        class_name: rows[i].class_name,
                        class_teacher: rows[i].teacher_name,
                    };
                    add.classes.push(addClass);
                }
            } else {
                let add = {
                    class_id: rows[i].class_id,
                    class_name: rows[i].class_name,
                    class_level: rows[i].class_level,
                    class_teacher: rows[i].teacher_name,
                };
                response[response.length - 1].classes.push(add);
            }
        }
        res.json(response);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};