import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL CLASSES classes.get("/", getClasses);

export const getClasses = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query("select c.id as class_id, c.name as class_name, c.level as class_level, c.schedule, c.room_number, t.name as teacher_name, t.last_name as teacher_last_name, coalesce(s.name, 'No tiene alumnos') as student_name, coalesce(s.last_name, '') as student_last_name, coalesce(s.phone_number, '') as student_phone, coalesce(s.enrollment_date, '') as enrollment_date, coalesce(s.city, '') as student_city, coalesce(s.id, '') as student_id, coalesce(s.email, '') as student_email from classes c left join teachers t on c.teacher_id = t.id left join student_classes sc on c.id = sc.class_id left join students s on sc.student_id = s.id order by c.id, s.id; ");
        rows.forEach(element => {
            element.class_id = element.class_id.toString();
        });

        let response = [];

        for(let i = 0; rows.length > i; i++) {
            let x;
            if(i >= 1) {x = i - 1;} else {x = 0;}

            if(i === 0 || rows[i].class_id !== rows[x].class_id){
                
                let add = {
                    class_id: rows[i].class_id,
                    class_name: rows[i].class_name, 
                    class_level: rows[i].class_level, 
                    schedule: rows[i].schedule,
                    room_number: rows[i].room_number, 
                    class_level: rows[i].class_level,
                    teacher_name: rows[i].teacher_name,
                    teacher_last_name: rows[i].teacher_last_name,
                    students: []
                }
                response.push(add);
                if(rows[i].class_id !== 'No tiene id'){
                    let addClass = {
                        student_id: rows[i].student_id,
                        student_name: rows[i].student_name,
                        student_last_name: rows[i].student_last_name,
                        student_email: rows[i].student_email,
                        student_phone:  rows[i].student_phone,
                        enrollment_day: rows[i].enrollment_day,
                        student_city: rows[i].student_city
                    };
                    add.students.push(addClass); 
                }
            } else {
                let add = {
                    student_id: rows[i].student_id,
                    student_name: rows[i].student_name,
                    student_email: rows[i].student_email,
                    student_last_name: rows[i].student_last_name,
                    student_phone:  rows[i].student_phone,
                    enrollment_day: rows[i].enrollment_day,
                    student_city: rows[i].student_city
                };
                response[response.length -1].students.push(add);
            };
        };
        console.log(response)
        
        res.json(response);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};