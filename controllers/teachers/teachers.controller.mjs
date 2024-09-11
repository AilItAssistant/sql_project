import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL TEACHERS teachers.get("/", getTeachers);

export const getTeachers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
            SELECT 
                t.id AS teacher_id, 
                t.name AS teacher_name, 
                t.last_name AS teacher_last_name, 
                t.phone_number AS teacher_phone_number, 
                t.email, 
                t.hire_date,
                t.address,
                t.department, 
                t.status AS teacher_status, 
                COALESCE(c.id, 'N/A') AS class_id, 
                COALESCE(c.name, 'No tiene clase') AS class_name,
                COALESCE(l.name, 'N/A') AS class_level 
            FROM 
                teachers t 
            LEFT JOIN 
                class_teachers ct ON t.id = ct.teacher_id
            LEFT JOIN 
                classes c ON ct.class_id = c.id
            LEFT JOIN 
                levels l ON c.level_id = l.id
            ORDER BY 
                t.id, 
                c.id;
            `);
        rows.forEach(element => {
            element.teacher_id = element.teacher_id.toString();
            if(element.hire_date){element.hire_date = element.hire_date.toLocaleDateString('es-ES', {year: 'numeric', month: 'numeric', day: 'numeric',});}
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
                    address: rows[i].address,
                    hire_date: rows[i].hire_date,
                    name: rows[i].teacher_name,
                    department: rows[i].department,
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

export const filterTeachers = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
            SELECT 
                t.id AS teacher_id, t.name AS teacher_name, t.last_name AS teacher_last_name, 
                t.phone_number AS teacher_phone_number, t.email, t.department, t.status AS teacher_status, 
                COALESCE(c.id, 'N/A') AS class_id, COALESCE(c.name, 'No tiene clase') AS class_name, 
                COALESCE(c.level, 'N/A') AS class_level FROM teachers t 
                LEFT JOIN classes c ON t.id = c.teacher_id
            WHERE 
                (t.last_name LIKE CONCAT(IFNULL('${req.body.last_name}', ''), '%')) OR 
                (t.department LIKE CONCAT(IFNULL('${req.body.department}', ''), '%')) OR 
                (t.phone_number LIKE CONCAT(IFNULL('${req.body.phone_number}', ''), '%')) OR 
                (t.email LIKE CONCAT(IFNULL('${req.body.email}', ''), '%')) 
            ORDER BY 
                t.id, c.id; 
            `);
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
                    department: rows[i].department,
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

export const deleteTeacher = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
            DELETE FROM 
                teachers
            WHERE 
                id = ${req.body.id};
        `);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const statusTeacher = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        if( req.body.status === "active" ) {
            let rows = await conn.query(`
                UPDATE 
                    teachers
                SET 
                    status = 'inactive'
                WHERE 
                    id = ${req.body.id};
            `);
        } else if( req.body.status === "inactive" ) {
            let rows = await conn.query(`
                UPDATE 
                    teachers
                SET 
                    status = 'active'
                WHERE 
                    id = ${req.body.id};
            `);
        }else {
            let rows = await conn.query(`
                UPDATE 
                    teachers
                SET 
                    status = 'active'
                WHERE 
                    id = ${req.body.id};
            `);
        };
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const addTeacher = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
            let rows = await conn.query(`
                INSERT INTO 
                    teachers (name, last_name, email, hire_date, phone_number, address, department, status)
                VALUES 
                    ('${req.body.name}', '${req.body.last_name}', '${req.body.email}', 
                    '${req.body.hire_date}', '${req.body.phone_number}', '${req.body.address}', 
                    '${req.body.department}', '${req.body.status}');
            `);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const editTeacher = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
            let rows = await conn.query(`
                UPDATE 
                    teachers
                SET 
                    name = CASE WHEN '${req.body.name}' != '' THEN '${req.body.name}' ELSE name END,
                    last_name = CASE WHEN '${req.body.last_name}' != '' THEN '${req.body.last_name}' ELSE last_name END,
                    email = CASE WHEN '${req.body.email}' != '' THEN '${req.body.email}' ELSE email END,
                    hire_date = CASE WHEN '${req.body.hire_date}' != '' THEN '${req.body.hire_date}' ELSE hire_date END,
                    phone_number = CASE WHEN '${req.body.phone_number}' != '' THEN '${req.body.phone_number}' ELSE phone_number END,
                    address = CASE WHEN '${req.body.address}' != '' THEN '${req.body.address}' ELSE address END,
                    department = CASE WHEN '${req.body.department}' != '' THEN '${req.body.department}' ELSE department END,
                    status = CASE WHEN '${req.body.status}' != '' THEN '${req.body.status}' ELSE status END
                WHERE 
                    id = ${req.body.id};
            `);
        
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const addClass = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
             INSERT INTO 
                class_teachers (
                teacher_id, 
                class_id)
            VALUES (
            '${req.body.teacher_id}', 
            '${req.body.class_id}');
        `);
       
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const deleteClass = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
            DELETE FROM 
                class_teachers
            WHERE 
                class_id = ${req.body.class_id} 
            AND 
                teacher_id = ${req.body.teacher_id};
        `);
       
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const teacherByClassId = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
            SELECT
                t.id AS teacher_id,
                t.name AS teacher_name,
                t.last_name AS teacher_last_name,
                t.department AS teacher_department
            FROM 
                class_teachers ct
            JOIN 
                teachers t ON ct.teacher_id = t.id
            WHERE 
                ct.class_id = ${req.body.id};
        `);

        rows.forEach((element) => {
            element.teacher_id = element.teacher_id.toString();
        });
        res.json(rows);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const addTeacherToClass = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
            INSERT INTO 
                class_teachers (
                    class_id, 
                    teacher_id
                    )
            VALUES (
                ${req.body.class_id}, 
                ${req.body.teacher_id}
            );
        `);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};

export const deleteTeacherToClass = async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let rows = await conn.query(`
            DELETE FROM 
                class_teachers
            WHERE 
                class_id = ${req.body.class_id} 
            AND 
                teacher_id = ${req.body.teacher_id};
        `);
        res.json(200);
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) return conn.end();
    }
};