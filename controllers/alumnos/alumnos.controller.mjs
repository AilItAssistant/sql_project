import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL ALUMNOS alumnos.get("/", getAlumnos);

export const getAlumnos = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select s.id as student_id, s.name as student_name, s.phone_number as student_phone_number, s.last_name as student_last_name, s.email, s.level as student_level, s.city, s.identification_document, coalesce(c.name, 'No tiene clase') as class_name, coalesce(c.id, 'No tiene id') as class_id, coalesce(c.level, 'N/A') as class_level, coalesce(t.name, 'N/A') as teacher_name from students s left join student_classes sc on s.id = sc.student_id left join classes c on sc.class_id = c.id left join teachers t on c.teacher_id = t.id order by s.id, c.id; ");
        
        rows.forEach(element => {
            element.student_id = element.student_id.toString();
        });
        let response = [];
        for(let i = 0; rows.length > i; i++) {
            let x;
            if(i >= 1) {x = i - 1;} else {x = 0;}

            if(i === 0 || rows[i].student_id !== rows[x].student_id){
                
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