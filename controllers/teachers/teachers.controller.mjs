import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL TEACHERS teachers.get("/", getTeachers);

export const getTeachers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("SELECT t.id AS teacher_id, t.name AS teacher_name, t.last_name AS teacher_last_name, t.phone_number AS teacher_phone_number, t.email, t.department, t.status AS teacher_status, COALESCE(c.id, 'N/A') AS class_id, COALESCE(c.name, 'No tiene clase') AS class_name, COALESCE(c.level, 'N/A') AS class_level FROM teachers t LEFT JOIN classes c ON t.id = c.teacher_id ORDER BY t.id, c.id; ");
        rows.forEach(element => {
            element.teacher_id = element.teacher_id.toString();
        });
        let response = [];

        for(let i = 0; rows.length > i; i++) {
            let x;
            if(i >= 1) {x = i - 1;} else {x = 0;}

            if(i === 0 || rows[i].teacher_id !== rows[x].teacher_id){
                
                let add = {
                    teacher_id: rows[i].teacher_id,
                    email: rows[i].email, 
                    phone_number: rows[i].teacher_phone_number, 
                    last_name: rows[i].teacher_last_name,
                    name: rows[i].teacher_name,
                    departament: rows[i].departament,
                    teacher_status: rows[i].teacher_status,
                    classes: []
                };
                response.push(add);
                if(rows[i].class_id !== 'No tiene id'){
                    let addClass = {
                        class_id: rows[i].class_id,
                        class_level: rows[i].class_level,
                        class_name: rows[i].class_name,
                        class_teacher: rows[i].teacher_name
                    };
                    add.classes.push(addClass); 
                }
            } else {
                let add = {
                    class_id: rows[i].class_id,
                    class_name: rows[i].class_name,
                    class_level: rows[i].class_level,
                    class_teacher: rows[i].teacher_name
                };
                response[response.length -1].classes.push(add);
            };
        };
        res.json(response);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};