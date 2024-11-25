import "dotenv/config";
import { pool } from "../../index.mjs"

//?GET ALL CLASSES classes.get("/", getClasses);

export const getClasses = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    c.id AS class_id,
                    c.name AS class_name,
                    COALESCE(l.name, 'N/A') AS class_level,
                    c.schedule,
                    c.level_id,
                    c.room_number,
                    stc.name AS class_status,
                    stc.id AS class_status_id,
                    t.name AS teacher_name,
                    t.last_name AS teacher_last_name,
                    stt.name AS teacher_status,
                    stt.id AS teacher_status_id,
                    COALESCE(s.name, 'No tiene alumnos') AS student_name,
                    COALESCE(s.last_name, '') AS student_last_name,
                    COALESCE(s.phone_number, '') AS student_phone,
                    COALESCE(s.enrollment_date, '') AS enrollment_date,
                    COALESCE(cty.name, '') AS student_city,
                    COALESCE(cty.id, '') AS student_city_id,
                    COALESCE(s.id, '') AS student_id,
                    COALESCE(s.email, '') AS student_email,
                    COALESCE(sts.name, 'N/A') AS student_status,
                    COALESCE(sts.id, 'N/A') AS student_status_id
                FROM
                    classes c
                LEFT JOIN class_teachers ct ON c.id = ct.class_id
                LEFT JOIN teachers t ON ct.teacher_id = t.id
                LEFT JOIN student_classes sc ON c.id = sc.class_id
                LEFT JOIN students s ON sc.student_id = s.id
                LEFT JOIN levels l ON c.level_id = l.id
                left join status stc on c.id = stc.id
                left join status stt on t.id = stt.id
                left join status sts on s.id = sts.id
                left join cities cty on s.id = cty.id
                ORDER BY
                    c.id,
                    s.id;
            `);
            rows.forEach(element => {
                element.class_id = element.class_id.toString();
                if(element.teacher_id){element.teacher_id = element.teacher_id.toString();}
                if(element.level_id){element.level_id = element.level_id.toString();}
                if(element.student_city_id){element.student_city_id = element.student_city_id.toString();}
                if(element.class_status_id){element.class_status_id = element.class_status_id.toString();}
                if(element.teacher_status_id){element.teacher_status_id = element.teacher_status_id.toString();}
                if(element.student_status_id){element.student_status_id = element.student_status_id.toString();}
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
                        level_id: rows[i].level_id,
                        schedule: rows[i].schedule,
                        room_number: rows[i].room_number,
                        class_level: rows[i].class_level,
                        teacher_name: rows[i].teacher_name,
                        teacher_id: rows[i].teacher_id,
                        teacher_last_name: rows[i].teacher_last_name,
                        class_status: rows[i].class_status,
                        class_status_id: rows[i].class_status_id,
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
                            student_city: rows[i].student_city,
                            student_city_id: rows[i].student_city_id
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
                        student_city: rows[i].student_city,
                        student_city_id: rows[i].student_city_id
                    };
                    response[response.length -1].students.push(add);
                };
            };
            let resp = {
                classes: response,
                dataLogin: req.data
            };
            res.json(resp);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const filterClasses = async (req, res) => {
    console.log(req.body)
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    c.id AS class_id,
                    c.name AS class_name,
                    COALESCE(l.name, 'N/A') AS class_level,
                    c.schedule,
                    c.level_id,
                    c.room_number,
                    c.status AS class_status,
                    t.name AS teacher_name,
                    t.last_name AS teacher_last_name,
                    t.status AS teacher_status,
                    COALESCE(s.name, 'No tiene alumnos') AS student_name,
                    COALESCE(s.last_name, '') AS student_last_name,
                    COALESCE(s.phone_number, '') AS student_phone,
                    COALESCE(s.enrollment_date, '') AS enrollment_date,
                    COALESCE(s.city, '') AS student_city,
                    COALESCE(s.id, '') AS student_id,
                    COALESCE(s.email, '') AS student_email,
                    COALESCE(s.status, 'N/A') AS student_status
                FROM
                    classes c
                LEFT JOIN
                    class_teachers ct ON c.id = ct.class_id
                LEFT JOIN
                    teachers t ON ct.teacher_id = t.id
                LEFT JOIN
                    student_classes sc ON c.id = sc.class_id
                LEFT JOIN
                    students s ON sc.student_id = s.id
                LEFT JOIN
                    levels l ON c.level_id = l.id
                WHERE
                    (t.last_name LIKE CONCAT(IFNULL('${req.body.last_name}', ''), '%')) OR
                    (c.room_number LIKE CONCAT(IFNULL('${req.body.class}', ''), '%')) OR
                    (l.name LIKE CONCAT(IFNULL('${req.body.level}', ''), '%')) OR
                    (c.name LIKE CONCAT(IFNULL('${req.body.class_name}', ''), '%'))
                ORDER BY
                    c.id,
                    s.id;
            `);
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
                        class_status: rows[i].class_status,
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
            res.json(response);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const statusClass = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            if( req.body.status === "active" ) {
                await conn.query(`
                    UPDATE
                        classes
                    SET
                        status = 'inactive'
                    WHERE
                        id = ${req.body.id};
                `);
            } else if( req.body.status === "inactive" ) {
                await conn.query(`
                    UPDATE
                        classes
                    SET
                        status = 'active'
                    WHERE
                        id = ${req.body.id};
                `);
            }else {
                await conn.query(`
                    UPDATE
                        classes
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
        };
    };
};

export const deleteClass = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                DELETE FROM
                    classes
                WHERE
                    id = ${req.body.id};
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const addClass = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                INSERT INTO classes (
                    name,
                    schedule,
                    room_number,
                    level_id,
                    status
                ) VALUES (
                    '${req.body.name}',
                    '${req.body.schedule}',
                    '${req.body.class}',
                    ${req.body.level},
                    '${req.body.status}'
                );
            `);
            let class_id = await conn.query(
                `SELECT LAST_INSERT_ID() AS class_id;
            `);
            class_id = class_id[0].class_id.toString();
            await conn.query(`
                INSERT INTO
                    class_teachers
                    (class_id,
                    teacher_id)
                VALUES
                    (${class_id},
                    ${req.body.teacher_id});
            `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const editClass = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            await conn.query(`
                UPDATE classes
                    SET
                        name = IF('${req.body.name}' != '', '${req.body.name}', name),
                        schedule = IF('${req.body.schedule}' != '', '${req.body.schedule}', schedule),
                        room_number = IF('${req.body.class}' != '', '${req.body.class}', room_number),
                        level_id = IF('${req.body.level}' != '' AND EXISTS (SELECT 1 FROM levels WHERE id = '${req.body.level}'), '${req.body.level}', level_id),
                        status = IF('${req.body.status}' != '', '${req.body.status}', status)
                    WHERE
                        id = ${req.body.id};
                `);
            res.json(200);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const getClassesByStudentId = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
                SELECT
                    s.last_name AS student_last_name,
                    c.id AS class_id,
                    c.name AS class_name,
                    COALESCE(l.name, 'N/A') AS class_level,
                    t.name AS teacher_name,
                    t.last_name AS teacher_last_name
                FROM
                    students s
                JOIN
                    student_classes sc ON s.id = sc.student_id
                JOIN
                    classes c ON sc.class_id = c.id
                LEFT JOIN
                    levels l ON c.level_id = l.id
                LEFT JOIN
                    class_teachers ct ON c.id = ct.class_id
                LEFT JOIN
                    teachers t ON ct.teacher_id = t.id
                WHERE
                    s.id = ${req.body.id};
            `);
            rows.forEach(element => {
                element.class_id = element.class_id.toString();
                if(element.teacher_id){element.teacher_id = element.teacher_id.toString();}
                if(element.level_id){element.level_id = element.level_id.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};

export const getClassesByTeacherId = async (req, res) => {
    if ( req.data ) {
        let conn;
        try {
            conn = await pool.getConnection();
            let rows = await conn.query(`
            SELECT
                    c.id AS class_id,
                    c.name AS class_name,
                    c.schedule,
                    COALESCE(l.name, 'N/A') AS level_name,
                    c.level_id,
                    c.room_number,
                    st.name AS class_status,
                    st.id AS class_status_id,
                    t.name AS teacher_name,
                    t.last_name AS teacher_last_name,
                    sc.name AS teacher_status,
                    sc.id AS teacher_status_id
                FROM classes c
                JOIN class_teachers ct ON c.id = ct.class_id
                JOIN teachers t ON ct.teacher_id = t.id
                LEFT JOIN levels l ON c.level_id = l.id
                left join status st on t.status_id = st.id
                left join status sc on c.status_id = sc.id
                WHERE t.id = ${req.body.id};
            `);
            rows.forEach(element => {
                element.class_id = element.class_id.toString();
                if(element.teacher_id){element.teacher_id = element.teacher_id.toString();}
                if(element.level_id){element.level_id = element.level_id.toString();}
                if(element.class_status_id){element.class_status_id = element.class_status_id.toString();}
                if(element.teacher_status_id){element.teacher_status_id = element.teacher_status_id.toString();}
            });
            res.json(rows);
        } catch (error) {
            console.log(error);
        } finally {
            if (conn) return conn.end();
        };
    };
};